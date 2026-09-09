import unittest
from pathlib import Path
from dataclasses import replace
from llm_evidence_lab.data import load_corpus
from llm_evidence_lab.retrieval import Retriever, EvidencePolicy, make_citation, validate_citation
from llm_evidence_lab.evaluation import evaluate
from llm_evidence_lab.report import render_html
from llm_evidence_lab.ollama import generate_local

ROOT = Path(__file__).resolve().parents[1]

class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.docs = load_corpus(ROOT / 'data/corpus.jsonl')
        self.retriever = Retriever(self.docs)

    def test_exact_source_and_tampering(self):
        citation = make_citation(self.docs[0])
        self.assertTrue(validate_citation(citation, self.retriever.documents))
        citation['excerpt'] += ' inventado'
        self.assertFalse(validate_citation(citation, self.retriever.documents))

    def test_unknown_abstains(self):
        self.assertEqual(self.retriever.evidence('temperatura Marte')['status'], 'abstained')

    def test_known_retrieves_expected(self):
        self.assertEqual(self.retriever.search('presupuesto campaña')[0].document_id, 'campaign')

    def test_empty_and_invalid_limits(self):
        for text, k in [('', 3), ('presupuesto', 0), ('a'*2001, 3)]:
            with self.assertRaises(ValueError): self.retriever.search(text, k)

    def test_policy_rejects_invalid(self):
        with self.assertRaises(ValueError): EvidencePolicy(minimum_query_coverage=2)

    def test_evaluation_reproducible_and_no_llm(self):
        first = evaluate(ROOT/'data/corpus.jsonl', ROOT/'data/evaluation.jsonl')
        self.assertEqual(first, evaluate(ROOT/'data/corpus.jsonl', ROOT/'data/evaluation.jsonl'))
        self.assertFalse(first['llm_used'])
        self.assertEqual(first['question_count'], 12)
        self.assertIn('No se ejecuta un LLM', render_html(first))

    def test_html_escapes_question(self):
        report = evaluate(ROOT/'data/corpus.jsonl', ROOT/'data/evaluation.jsonl')
        report['methods']['bm25']['cases'][0]['question'] = '<script>alert(1)</script>'
        self.assertNotIn('<script>', render_html(report))

    def test_duplicate_corpus_rejected(self):
        with self.assertRaises(ValueError): Retriever([self.docs[0], self.docs[0]])

    def test_llm_never_called_without_evidence(self):
        def unexpected(_): self.fail('No se debe llamar al modelo')
        self.assertFalse(generate_local('Marte', self.retriever.evidence('Marte'), 'demo', transport=unexpected)['llm_used'])

    def test_llm_rejects_remote_endpoint(self):
        with self.assertRaises(ValueError): generate_local('consulta', {}, 'demo', 'https://example.com')

    def test_llm_rejects_invented_citation(self):
        evidence = self.retriever.evidence('presupuesto campaña')
        with self.assertRaises(ValueError):
            generate_local('presupuesto campaña', evidence, 'demo', transport=lambda _: {'message': {'content': '{"answer":"x","citations":["inventado"]}'}})

    def test_llm_contract_requires_human_review(self):
        evidence = self.retriever.evidence('presupuesto campaña')
        result = generate_local('presupuesto campaña', evidence, 'demo', transport=lambda _: {'message': {'content': '{"answer":"200 unidades","citations":["campaign"]}'}})
        self.assertEqual(result['status'], 'draft_requires_review')

if __name__ == '__main__': unittest.main()
