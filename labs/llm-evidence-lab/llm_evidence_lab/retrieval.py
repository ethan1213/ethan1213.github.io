"""Baseline léxico y BM25 con citas verificables y abstención heurística."""

import hashlib
import math
import re
import unicodedata
from collections import Counter
from dataclasses import asdict, dataclass

from .data import Document


STOPWORDS = frozenset("a al algo ante bajo con contra cual cuales cuando como de del desde donde el ella en entre es esa ese eso esta estas este estos ha hay la las le lo los me mi o para por que quien se ser si sin sobre su sus te tiene tu un una uno unos unas y ya the a an of to is are what how which in on for does do can".split())


def tokenize(text: str) -> list[str]:
    normalized = "".join(char for char in unicodedata.normalize("NFKD", text.casefold()) if not unicodedata.combining(char))
    return [word for word in re.findall(r"[a-z0-9]+", normalized) if word not in STOPWORDS]


@dataclass(frozen=True)
class Hit:
    document_id: str
    score: float


@dataclass(frozen=True)
class EvidencePolicy:
    minimum_query_coverage: float = 0.45
    minimum_shared_terms: int = 2

    def __post_init__(self) -> None:
        if not 0 <= self.minimum_query_coverage <= 1 or self.minimum_shared_terms < 1:
            raise ValueError("Política de evidencia inválida")


class Retriever:
    def __init__(self, documents: list[Document], method: str = "bm25", k1: float = 1.2, b: float = 0.75):
        if not documents or len({doc.id for doc in documents}) != len(documents):
            raise ValueError("El corpus debe contener documentos con identificadores únicos")
        if method not in ("lexical", "bm25") or k1 <= 0 or not 0 <= b <= 1:
            raise ValueError("Configuración de recuperación inválida")
        self.documents = {doc.id: doc for doc in documents}
        self.method, self.k1, self.b = method, k1, b
        self.counts = {doc.id: Counter(tokenize(doc.title + " " + doc.text)) for doc in documents}
        self.lengths = {identifier: sum(counts.values()) for identifier, counts in self.counts.items()}
        self.average_length = sum(self.lengths.values()) / len(documents)
        self.document_frequency = Counter(term for counts in self.counts.values() for term in counts)

    def search(self, question: str, top_k: int = 3) -> list[Hit]:
        if not isinstance(question, str) or not question.strip() or len(question) > 2000:
            raise ValueError("La pregunta debe contener entre 1 y 2000 caracteres")
        if not 1 <= top_k <= 100:
            raise ValueError("top_k debe estar entre 1 y 100")
        terms = set(tokenize(question))
        hits = []
        for identifier, counts in self.counts.items():
            if self.method == "lexical":
                score = len(terms & counts.keys()) / len(terms) if terms else 0.0
            else:
                score = 0.0
                for term in sorted(terms):
                    frequency = counts[term]
                    if not frequency:
                        continue
                    inverse_frequency = math.log(1 + (len(self.documents) - self.document_frequency[term] + 0.5) / (self.document_frequency[term] + 0.5))
                    length_ratio = self.lengths[identifier] / self.average_length if self.average_length else 0.0
                    score += inverse_frequency * frequency * (self.k1 + 1) / (frequency + self.k1 * (1 - self.b + self.b * length_ratio))
            if score > 0:
                hits.append(Hit(identifier, round(score, 10)))
        return sorted(hits, key=lambda hit: (-hit.score, hit.document_id))[:top_k]

    def evidence(self, question: str, policy: EvidencePolicy | None = None) -> dict:
        policy = policy or EvidencePolicy()
        hits = self.search(question)
        terms = set(tokenize(question))
        shared: set[str] = set()
        coverage = 0.0
        if hits:
            shared = terms & self.counts[hits[0].document_id].keys()
            coverage = len(shared) / len(terms) if terms else 0.0
        accepted = bool(hits and len(shared) >= policy.minimum_shared_terms and coverage >= policy.minimum_query_coverage)
        result = {
            "status": "evidence_found" if accepted else "abstained",
            "method": self.method,
            "retrieved": [asdict(hit) for hit in hits],
            "query_coverage": round(coverage, 6),
            "shared_terms": sorted(shared),
            "citations": [],
            "message": "Fragmento documental recuperado; no constituye una respuesta generada ni valida su aplicabilidad." if accepted else "No encontré evidencia léxica suficiente en este corpus sintético.",
        }
        if accepted:
            result["citations"] = [make_citation(self.documents[hits[0].document_id])]
        return result


def make_citation(document: Document) -> dict:
    return {
        "document_id": document.id,
        "title": document.title,
        "source": document.source,
        "start": 0,
        "end": len(document.text),
        "excerpt": document.text,
        "sha256": hashlib.sha256(document.text.encode("utf-8")).hexdigest(),
    }


def validate_citation(citation: dict, documents: dict[str, Document]) -> bool:
    if not isinstance(citation, dict):
        return False
    document = documents.get(citation.get("document_id"))
    if document is None:
        return False
    start, end, excerpt = citation.get("start"), citation.get("end"), citation.get("excerpt")
    if type(start) is not int or type(end) is not int or not isinstance(excerpt, str) or not 0 <= start < end <= len(document.text):
        return False
    return bool(excerpt == document.text[start:end] and citation.get("source") == document.source and citation.get("title") == document.title and citation.get("sha256") == hashlib.sha256(excerpt.encode("utf-8")).hexdigest())
