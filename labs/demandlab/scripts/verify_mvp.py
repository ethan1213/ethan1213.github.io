"""Verifica el MVP y emite un resumen solo si pruebas y demo pasan."""
from __future__ import annotations
import contextlib
import io
import json
import platform
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from demandlab.__main__ import main


def verify() -> int:
    suite = unittest.defaultTestLoader.discover(str(ROOT / "tests"))
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    if not result.wasSuccessful():
        return 1
    output = ROOT / "artifacts" / "demo"
    with contextlib.redirect_stdout(io.StringIO()):
        if main(["demo", "--output", str(output)]) != 0:
            return 1
    report = json.loads((output / "report.json").read_text(encoding="utf-8"))
    summary = {"project": "DemandLab", "version": "0.1.0", "status": "MVP de investigación", "validation": {"command": "python scripts/verify_mvp.py", "python": platform.python_version(), "tests_passed": result.testsRun, "tests_failed": len(result.failures), "tests_errors": len(result.errors), "tests_skipped": len(result.skipped)}, "dataset": report["dataset"], "methodology": report["methodology"], "aggregate": report["aggregate"], "by_sku": report["by_sku"], "ridge_mae_reduction_percent": report["ridge_mae_reduction_percent"], "limits": report["limits"]}
    evidence = ROOT / "evidence"
    evidence.mkdir(exist_ok=True)
    (evidence / "demo-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    print(f"MVP verificado: {result.testsRun} pruebas y demo sintética. Informe: artifacts/demo/index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(verify())
