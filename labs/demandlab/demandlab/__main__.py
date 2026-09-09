"""CLI reproducible de demo y evaluación de datos propios."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

from .core import backtest, read_csv, synthetic_data, write_csv
from .report import write_html


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="DemandLab: pronóstico supervisado con evaluación temporal")
    commands = parser.add_subparsers(dest="command", required=True)
    demo = commands.add_parser("demo", help="Generar y evaluar demanda sintética")
    demo.add_argument("--seed", type=int, default=20260907)
    demo.add_argument("--days", type=int, default=210)
    evaluate = commands.add_parser("evaluate", help="Evaluar un CSV local sin inferir su origen")
    evaluate.add_argument("--csv", type=Path, required=True)
    for command in (demo, evaluate):
        command.add_argument("--output", type=Path, default=Path("artifacts/demo"))
        command.add_argument("--folds", type=int, default=3)
        command.add_argument("--horizon", type=int, default=14)
        command.add_argument("--alpha", type=float, default=1.0)
    args = parser.parse_args(argv)
    try:
        if args.folds < 1 or args.horizon < 1:
            raise ValueError("folds y horizon deben ser positivos")
        if args.command == "demo":
            csv_path = args.output / "synthetic-demand.csv"
            write_csv(synthetic_data(args.days, args.seed), csv_path)
        else:
            csv_path = args.csv
        resolved_csv = csv_path.resolve()
        if resolved_csv in {(args.output / "report.json").resolve(), (args.output / "index.html").resolve()}:
            raise ValueError("El CSV de entrada no puede coincidir con un archivo de salida")
        series = read_csv(csv_path)
        report = backtest(series, args.folds, args.horizon, args.alpha)
        report["dataset"] = {"kind": "synthetic" if args.command == "demo" else "user_supplied_unverified", "seed": args.seed if args.command == "demo" else None, "sha256": hashlib.sha256(csv_path.read_bytes()).hexdigest(), "observations": sum(len(rows) for rows in series.values()), "sku_count": len(series)}
        if args.command != "demo":
            report["limits"][0] = "CSV aportado por el usuario: DemandLab no verifica su procedencia, privacidad ni representatividad."
        args.output.mkdir(parents=True, exist_ok=True)
        (args.output / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
        write_html(report, args.output / "index.html")
        print(json.dumps({"status": "ok", "dataset_kind": report["dataset"]["kind"], "aggregate": report["aggregate"], "report": str((args.output / "index.html").resolve())}, ensure_ascii=False, indent=2))
        return 0
    except (ValueError, OSError) as error:
        print(f"DemandLab: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
