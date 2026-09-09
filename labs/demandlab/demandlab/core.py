"""Contrato, regresión ridge y backtesting temporal sin librerías externas."""

from __future__ import annotations

import csv
import math
import random
from collections import defaultdict
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path
from statistics import fmean

HISTORY = 28
FEATURES = ("trend", "weekly_sin", "weekly_cos", "lag_7", "lag_14", "mean_7", "mean_28")


@dataclass(frozen=True)
class Observation:
    day: date
    sku: str
    demand: float


def synthetic_data(days: int = 210, seed: int = 20260907) -> list[Observation]:
    """Demanda artificial; no corresponde a clientes, ventas ni inventario real."""
    if days < 1:
        raise ValueError("days debe ser positivo")
    rng = random.Random(seed)
    rows = []
    for sku, level, trend, amplitude in (("PACK-001", 75, 0.20, 18), ("DRINK-002", 120, -0.08, 28), ("PART-003", 35, 0.05, 7)):
        for t in range(days):
            value = level + trend * t + amplitude * math.sin(2 * math.pi * t / 7) + rng.gauss(0, 4)
            rows.append(Observation(date(2026, 1, 1) + timedelta(days=t), sku, round(max(0, value), 2)))
    return rows


def write_csv(rows: list[Observation], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.writer(stream)
        writer.writerow(("date", "sku", "demand"))
        writer.writerows((row.day.isoformat(), row.sku, row.demand) for row in rows)


def read_csv(path: Path) -> dict[str, list[Observation]]:
    grouped: dict[str, list[Observation]] = defaultdict(list)
    with path.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames != ["date", "sku", "demand"]:
            raise ValueError("El CSV requiere exactamente las columnas date,sku,demand, en ese orden")
        for line, row in enumerate(reader, 2):
            try:
                if None in row or any(value is None for value in row.values()):
                    raise ValueError("cantidad de columnas incorrecta")
                raw_date, sku = row["date"], row["sku"].strip()
                day, value = date.fromisoformat(raw_date), float(row["demand"])
                if day.isoformat() != raw_date or not sku or len(sku) > 80:
                    raise ValueError("fecha debe usar YYYY-MM-DD y sku debe tener entre 1 y 80 caracteres")
                if not math.isfinite(value) or value < 0:
                    raise ValueError("demand debe ser un número finito no negativo")
                grouped[sku].append(Observation(day, sku, value))
            except (ValueError, TypeError) as error:
                raise ValueError(f"Fila {line}: {error}") from error
    if not grouped:
        raise ValueError("El CSV está vacío")
    for sku, rows in grouped.items():
        rows.sort(key=lambda row: row.day)
        if any(b.day - a.day != timedelta(days=1) for a, b in zip(rows, rows[1:])):
            raise ValueError(f"SKU {sku}: se requiere una observación diaria sin duplicados ni días faltantes")
    return dict(sorted(grouped.items()))


def features(history: list[float], t: int) -> list[float]:
    """Solo utiliza historia anterior a t; nunca recibe la etiqueta del día t."""
    if len(history) != t or t < HISTORY:
        raise ValueError("Se requieren al menos 28 días y len(history) == t")
    return [t / 100, math.sin(2 * math.pi * t / 7), math.cos(2 * math.pi * t / 7), history[-7], history[-14], fmean(history[-7:]), fmean(history[-28:])]


def solve(matrix: list[list[float]], target: list[float]) -> list[float]:
    """Eliminación gaussiana con pivote parcial para un sistema pequeño."""
    n = len(target)
    augmented = [list(row) + [value] for row, value in zip(matrix, target)]
    for col in range(n):
        pivot = max(range(col, n), key=lambda row: abs(augmented[row][col]))
        augmented[col], augmented[pivot] = augmented[pivot], augmented[col]
        if abs(augmented[col][col]) < 1e-12:
            raise ValueError("Sistema singular; revise los datos o la regularización")
        divisor = augmented[col][col]
        augmented[col] = [value / divisor for value in augmented[col]]
        for row in range(n):
            if row != col:
                multiplier = augmented[row][col]
                augmented[row] = [a - multiplier * b for a, b in zip(augmented[row], augmented[col])]
    return [row[-1] for row in augmented]


@dataclass(frozen=True)
class Ridge:
    means: list[float]
    scales: list[float]
    coefficients: list[float]
    samples: int

    @classmethod
    def fit(cls, history: list[float], alpha: float = 1.0) -> Ridge:
        if len(history) < HISTORY + 14:
            raise ValueError("Se necesitan al menos 42 días para entrenar")
        if not math.isfinite(alpha) or alpha <= 0:
            raise ValueError("alpha debe ser finito y positivo")
        if any(not math.isfinite(value) or value < 0 for value in history):
            raise ValueError("La historia debe contener demanda finita no negativa")
        raw = [features(history[:t], t) for t in range(HISTORY, len(history))]
        labels = history[HISTORY:]
        means = [fmean(column) for column in zip(*raw)]
        scales = [math.sqrt(fmean((value - means[i]) ** 2 for value in column)) or 1.0 for i, column in enumerate(zip(*raw))]
        design = [[1.0] + [(value - means[i]) / scales[i] for i, value in enumerate(row)] for row in raw]
        size = len(FEATURES) + 1
        gram = [[sum(row[i] * row[j] for row in design) + (alpha if i == j and i > 0 else 0) for j in range(size)] for i in range(size)]
        rhs = [sum(row[i] * label for row, label in zip(design, labels)) for i in range(size)]
        return cls(means, scales, solve(gram, rhs), len(labels))

    def forecast(self, history: list[float], horizon: int) -> list[float]:
        if horizon < 1:
            raise ValueError("horizon debe ser positivo")
        rolling = list(history)
        output = []
        for _ in range(horizon):
            values = features(rolling, len(rolling))
            design = [1.0] + [(value - self.means[i]) / self.scales[i] for i, value in enumerate(values)]
            prediction = max(0.0, sum(weight * value for weight, value in zip(self.coefficients, design)))
            if not math.isfinite(prediction):
                raise ValueError("Predicción no finita: el modelo no es válido para estos datos")
            rolling.append(prediction)
            output.append(prediction)
        return output


def seasonal_forecast(history: list[float], horizon: int) -> list[float]:
    if len(history) < 7 or horizon < 1:
        raise ValueError("La referencia estacional necesita 7 días y horizonte positivo")
    rolling = list(history)
    for _ in range(horizon):
        rolling.append(rolling[-7])
    return rolling[-horizon:]


def metrics(actual: list[float], predicted: list[float]) -> dict[str, float | int | None]:
    if not actual or len(actual) != len(predicted):
        raise ValueError("Las series deben tener la misma longitud y no estar vacías")
    if any(not math.isfinite(value) or value < 0 for value in actual + predicted):
        raise ValueError("Las métricas requieren valores finitos no negativos")
    error = sum(abs(a - b) for a, b in zip(actual, predicted))
    total = sum(actual)
    return {"mae": error / len(actual), "wape_percent": error / total * 100 if total else None, "absolute_error": error, "actual_total": total, "n": len(actual)}


def backtest(series: dict[str, list[Observation]], folds: int = 3, horizon: int = 14, alpha: float = 1.0) -> dict:
    if folds < 1 or horizon < 1:
        raise ValueError("folds y horizon deben ser positivos")
    if not series:
        raise ValueError("Se requiere al menos un SKU")
    results = []
    joined = {"seasonal": ([], []), "ridge": ([], [])}
    by_sku = []
    for sku, rows in sorted(series.items()):
        if len(rows) < HISTORY + 14 + folds * horizon:
            raise ValueError(f"SKU {sku}: requiere al menos {HISTORY + 14 + folds * horizon} días para esta configuración")
        sku_joined = {"seasonal": ([], []), "ridge": ([], [])}
        for fold in range(folds):
            boundary = len(rows) - (folds - fold) * horizon
            train = [row.demand for row in rows[:boundary]]
            actual = [row.demand for row in rows[boundary:boundary + horizon]]
            model = Ridge.fit(train, alpha)
            predictions = {"seasonal": seasonal_forecast(train, horizon), "ridge": model.forecast(train, horizon)}
            result = {"sku": sku, "fold": fold + 1, "train_start": rows[0].day.isoformat(), "train_end": rows[boundary - 1].day.isoformat(), "train_days": len(train), "supervised_samples": model.samples, "test_start": rows[boundary].day.isoformat(), "test_end": rows[boundary + horizon - 1].day.isoformat(), "dates": [row.day.isoformat() for row in rows[boundary:boundary + horizon]], "actual": actual, "predictions": predictions, "metrics": {name: metrics(actual, predicted) for name, predicted in predictions.items()}, "ridge_model": {"feature_names": ["intercept"] + list(FEATURES), "means": model.means, "scales": model.scales, "coefficients": model.coefficients}}
            results.append(result)
            for name, predicted in predictions.items():
                joined[name][0].extend(actual)
                joined[name][1].extend(predicted)
                sku_joined[name][0].extend(actual)
                sku_joined[name][1].extend(predicted)
        by_sku.append({"sku": sku, "metrics": {name: metrics(*values) for name, values in sku_joined.items()}})
    aggregate = {name: metrics(*values) for name, values in joined.items()}
    base_error = aggregate["seasonal"]["mae"]
    return {"schema_version": "1.0", "project": "DemandLab", "status": "MVP de investigación", "methodology": {"frequency": "daily", "strategy": "expanding_window_recursive", "folds": folds, "horizon_days": horizon, "ridge_alpha": alpha, "history_days": HISTORY, "normalization": "training_only", "hyperparameters": "fixed_before_evaluation", "baseline": "seasonal_naive_7_days", "test_labels_used_in_forecast": False, "sku_calendar_alignment": "independent_last_windows_per_sku"}, "aggregate": aggregate, "ridge_mae_reduction_percent": (base_error - aggregate["ridge"]["mae"]) / base_error * 100 if base_error else None, "by_sku": by_sku, "splits": results, "limits": ["La demo usa datos sintéticos; sus métricas no predicen resultados de una empresa.", "La demanda observada se asume completa: no modela ventas perdidas por quiebres de stock.", "No incluye promociones, festivos, intervalos de incertidumbre ni costos de inventario.", "No selecciona hiperparámetros sobre los bloques de evaluación.", "Cada SKU se evalúa en sus últimas ventanas disponibles; sus calendarios pueden diferir.", "No toma decisiones de compra ni garantiza mejoras sobre la referencia estacional."]}
