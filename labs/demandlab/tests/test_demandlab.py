from __future__ import annotations

import contextlib
import io
import json
import math
import tempfile
import unittest
from datetime import date, timedelta
from pathlib import Path

from demandlab.__main__ import main
from demandlab.core import Observation, Ridge, backtest, features, metrics, read_csv, seasonal_forecast, solve, synthetic_data, write_csv


class DataContractTests(unittest.TestCase):
    def load(self, content: str):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "input.csv"
            path.write_text(content, encoding="utf-8")
            return read_csv(path)

    def test_demo_is_deterministic(self):
        self.assertEqual(synthetic_data(seed=41), synthetic_data(seed=41))
        self.assertNotEqual(synthetic_data(seed=41), synthetic_data(seed=42))

    def test_csv_round_trip(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "demand.csv"
            rows = synthetic_data(90)
            write_csv(rows, path)
            self.assertEqual(sum(map(len, read_csv(path).values())), 270)

    def test_duplicate_and_missing_days_rejected(self):
        for day in ("2026-01-01", "2026-01-03"):
            with self.subTest(day=day), self.assertRaisesRegex(ValueError, "sin duplicados"):
                self.load(f"date,sku,demand\n2026-01-01,A,1\n{day},A,2\n")

    def test_invalid_values_rejected(self):
        for value in ("nan", "inf", "-1", "", "hello"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                self.load(f"date,sku,demand\n2026-01-01,A,{value}\n")

    def test_contract_and_empty_input_rejected(self):
        for content in ("sku,date,demand\nA,2026-01-01,3\n", "date,sku,demand\n", "date,sku,demand\n2026-01-01,A,1,2\n", "date,sku,demand\n20260101,A,2\n"):
            with self.subTest(content=content), self.assertRaises(ValueError):
                self.load(content)


class ModelingTests(unittest.TestCase):
    def test_solver_uses_pivot(self):
        result = solve([[0, 2], [1, 1]], [4, 5])
        self.assertAlmostEqual(result[0], 3)
        self.assertAlmostEqual(result[1], 2)

    def test_metrics_use_total_demand_denominator(self):
        result = metrics([10, 0, 30], [8, 3, 35])
        self.assertAlmostEqual(result["mae"], 10 / 3)
        self.assertEqual(result["wape_percent"], 25)

    def test_zero_total_wape_is_undefined(self):
        self.assertIsNone(metrics([0, 0], [2, 3])["wape_percent"])
        self.assertEqual(metrics([0, 0], [2, 3])["mae"], 2.5)

    def test_invalid_metrics_rejected(self):
        for actual, predicted in (([], []), ([1], []), ([math.inf], [1]), ([1], [-1])):
            with self.subTest(actual=actual), self.assertRaises(ValueError):
                metrics(actual, predicted)

    def test_seasonal_baseline_is_recursive(self):
        self.assertEqual(seasonal_forecast([1, 2, 3, 4, 5, 6, 7], 14), [1, 2, 3, 4, 5, 6, 7] * 2)

    def test_features_require_history_before_label(self):
        self.assertEqual(features(list(range(28)), 28)[3], 21)
        with self.assertRaises(ValueError):
            features(list(range(29)), 28)

    def test_ridge_reproduces_constant_series(self):
        values = [11.0] * 80
        model = Ridge.fit(values)
        self.assertTrue(all(abs(value - 11) < 1e-8 for value in model.forecast(values, 14)))

    def test_invalid_alpha_and_short_training_rejected(self):
        for alpha in (0, -1, math.inf, math.nan):
            with self.subTest(alpha=alpha), self.assertRaises(ValueError):
                Ridge.fit([1.0] * 70, alpha)
        with self.assertRaises(ValueError):
            Ridge.fit([1.0] * 30)

    def test_future_labels_cannot_change_first_fold_predictions(self):
        rows = [row for row in synthetic_data(110) if row.sku == "PACK-001"]
        boundary = len(rows) - 3 * 14
        altered = rows[:boundary] + [Observation(row.day, row.sku, row.demand * 1000) for row in rows[boundary:]]
        original_report = backtest({"PACK-001": rows})
        changed_report = backtest({"PACK-001": altered})
        original, changed = original_report["splits"][0], changed_report["splits"][0]
        self.assertEqual(original["predictions"], changed["predictions"])
        self.assertEqual(original["ridge_model"], changed["ridge_model"])
        self.assertNotEqual(original["metrics"], changed["metrics"])

    def test_expanding_splits_and_aggregate_are_consistent(self):
        rows = [row for row in synthetic_data(110) if row.sku == "PACK-001"]
        report = backtest({"PACK-001": rows})
        for split in report["splits"]:
            self.assertLess(split["train_end"], split["test_start"])
            self.assertEqual((date.fromisoformat(split["test_end"]) - date.fromisoformat(split["test_start"])).days, 13)
        self.assertEqual([split["train_days"] for split in report["splits"]], [68, 82, 96])
        self.assertEqual(report["aggregate"]["ridge"]["n"], 42)
        total_error = sum(split["metrics"]["ridge"]["absolute_error"] for split in report["splits"])
        self.assertAlmostEqual(report["aggregate"]["ridge"]["mae"], total_error / 42)


class CliTests(unittest.TestCase):
    def test_demo_outputs_reproducible_evidence_and_accessible_report(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(main(["demo", "--output", temporary, "--days", "90"]), 0)
            report = (output / "report.json").read_bytes()
            parsed = json.loads(report)
            html = (output / "index.html").read_text(encoding="utf-8")
            self.assertEqual(parsed["dataset"]["kind"], "synthetic")
            self.assertEqual(len(parsed["splits"]), 9)
            self.assertIn("DEMO SINTÉTICA", html)
            self.assertIn('role="img"', html)
            self.assertIn("Ver valores del gráfico", html)
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(main(["demo", "--output", temporary, "--days", "90"]), 0)
            self.assertEqual(report, (output / "report.json").read_bytes())

    def test_custom_csv_is_unverified_and_sku_is_escaped(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            malicious_sku = '<script>alert("sku")</script>'
            rows = [Observation(date(2026, 1, 1) + timedelta(days=t), malicious_sku, 20 + t / 10) for t in range(90)]
            write_csv(rows, root / "input.csv")
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(main(["evaluate", "--csv", str(root / "input.csv"), "--output", str(root / "out")]), 0)
            result = json.loads((root / "out/report.json").read_text(encoding="utf-8"))
            html = (root / "out/index.html").read_text(encoding="utf-8")
            self.assertEqual(result["dataset"]["kind"], "user_supplied_unverified")
            self.assertNotIn("<script>", html)
            self.assertIn("&lt;script&gt;", html)

    def test_cli_invalid_input_returns_nonzero(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(main(["demo", "--days", "20", "--output", temporary]), 2)

    def test_cli_does_not_overwrite_input_with_report(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stderr(io.StringIO()):
            path = Path(temporary) / "report.json"
            original = b"date,sku,demand\n2026-01-01,A,5\n"
            path.write_bytes(original)
            self.assertEqual(main(["evaluate", "--csv", str(path), "--output", temporary]), 2)
            self.assertEqual(path.read_bytes(), original)


if __name__ == "__main__":
    unittest.main()
