"""Evaluación determinista. Las etiquetas se usan después de recuperar."""

import hashlib
import json
from dataclasses import asdict
from pathlib import Path

from . import __version__
from .data import file_digest, load_corpus, load_questions
from .retrieval import EvidencePolicy, Retriever, validate_citation


def ratio(numerator: int | float, denominator: int) -> float | None:
    return round(numerator / denominator, 6) if denominator else None


def evaluate(corpus_path: Path, questions_path: Path, policy: EvidencePolicy | None = None) -> dict:
    documents = load_corpus(corpus_path)
    questions = load_questions(questions_path, {doc.id for doc in documents})
    policy = policy or EvidencePolicy()
    report = {
        "schema_version": 1,
        "project_version": __version__,
        "corpus_sha256": file_digest(corpus_path),
        "questions_sha256": file_digest(questions_path),
        "document_count": len(documents),
        "question_count": len(questions),
        "answerable_count": sum(item.answerable for item in questions),
        "unanswerable_count": sum(not item.answerable for item in questions),
        "policy": asdict(policy),
        "bm25": {"k1": 1.2, "b": 0.75},
        "llm_used": False,
        "synthetic_data": True,
        "limitations": [
            "Corpus pequeño y completamente sintético; no representa documentos o clientes reales.",
            "No se ejecuta un LLM, ni embeddings, ni generación: este MVP evalúa la recuperación previa a un RAG.",
            "Una cita íntegra acredita procedencia, no relevancia, veracidad ni suficiencia para responder.",
            "La abstención usa coincidencias de palabras; puede aceptar preguntas sin respuesta y rechazar paráfrasis válidas.",
            "Las métricas describen exclusivamente este conjunto versionado; no son una garantía de rendimiento.",
        ],
        "methods": {},
    }
    for method in ("lexical", "bm25"):
        retriever = Retriever(documents, method)
        cases = []
        recall1 = recall3 = reciprocal_rank = answered = unsupported = correct_abstentions = citations = valid_citations = relevant_citations = 0
        for question in questions:
            result = retriever.evidence(question.question, policy)
            retrieved_ids = [hit["document_id"] for hit in result["retrieved"]]
            gold = set(question.gold_document_ids)
            rank = next((index for index, identifier in enumerate(retrieved_ids, 1) if identifier in gold), None)
            if question.answerable:
                recall1 += bool(rank == 1)
                recall3 += bool(rank is not None)
                reciprocal_rank += 1 / rank if rank is not None else 0
                answered += result["status"] == "evidence_found"
            else:
                unsupported += result["status"] == "evidence_found"
                correct_abstentions += result["status"] == "abstained"
            for citation in result["citations"]:
                citations += 1
                valid_citations += validate_citation(citation, retriever.documents)
                relevant_citations += citation["document_id"] in gold
            cases.append({"id": question.id, "question": question.question, "answerable": question.answerable, "gold_document_ids": list(question.gold_document_ids), "first_relevant_rank": rank, **result})
        report["methods"][method] = {
            "metrics": {
                "recall_at_1": ratio(recall1, report["answerable_count"]),
                "recall_at_3": ratio(recall3, report["answerable_count"]),
                "mrr_at_3": ratio(reciprocal_rank, report["answerable_count"]),
                "answerable_coverage": ratio(answered, report["answerable_count"]),
                "evidence_precision": ratio(relevant_citations, citations),
                "abstention_recall": ratio(correct_abstentions, report["unanswerable_count"]),
                "unsupported_evidence_rate": ratio(unsupported, report["unanswerable_count"]),
                "citation_integrity": ratio(valid_citations, citations),
            },
            "counts": {"citations": citations, "valid_citations": valid_citations, "relevant_citations": relevant_citations, "unsupported_evidence": unsupported, "correct_abstentions": correct_abstentions},
            "cases": cases,
        }
    fingerprint = json.dumps(report, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    report["run_id"] = hashlib.sha256(fingerprint).hexdigest()[:16]
    return report
