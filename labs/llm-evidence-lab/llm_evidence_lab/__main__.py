"""CLI sin instalación ni dependencias externas."""

import argparse
import json
import sys
from pathlib import Path

from .data import load_corpus
from .evaluation import evaluate
from .report import write_report
from .retrieval import Retriever


ROOT = Path(__file__).resolve().parent.parent


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Evalúa recuperación documental local con evidencia sintética. No ejecuta un LLM.")
    commands = parser.add_subparsers(dest="command", required=True)
    benchmark = commands.add_parser("evaluate", help="Compara baseline y BM25; genera JSON y HTML")
    benchmark.add_argument("--corpus", type=Path, default=ROOT / "data" / "corpus.jsonl")
    benchmark.add_argument("--questions", type=Path, default=ROOT / "data" / "evaluation.jsonl")
    benchmark.add_argument("--output", type=Path, default=ROOT / "artifacts" / "latest")
    search = commands.add_parser("search", help="Recupera evidencia con cita o abstiene")
    search.add_argument("question")
    search.add_argument("--method", choices=("lexical", "bm25"), default="bm25")
    search.add_argument("--corpus", type=Path, default=ROOT / "data" / "corpus.jsonl")
    args = parser.parse_args(argv)
    try:
        if args.command == "evaluate":
            report = evaluate(args.corpus, args.questions)
            json_path, html_path = write_report(report, args.output)
            print(f"Run {report['run_id']}: {report['question_count']} preguntas, {report['document_count']} documentos sintéticos.")
            for method, result in report["methods"].items():
                print(f"{method}: {json.dumps(result['metrics'], ensure_ascii=True)}")
            print(f"JSON: {json_path}\nHTML: {html_path}")
        else:
            result = Retriever(load_corpus(args.corpus), args.method).evidence(args.question)
            print(json.dumps(result, ensure_ascii=True, indent=2))
    except (OSError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
