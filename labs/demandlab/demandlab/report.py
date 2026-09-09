"""Informe portable: HTML y SVG propios, sin recursos externos."""

from __future__ import annotations

from html import escape
from pathlib import Path


def number(value: float | None, suffix: str = "") -> str:
    return "No definido" if value is None else f"{value:.2f}{suffix}"


def chart(split: dict) -> str:
    width, height, left, top, bottom = 740, 250, 48, 24, 32
    series = [("Observado", split["actual"], "#f4f2ee", ""), ("Estacional", split["predictions"]["seasonal"], "#edb56b", 'stroke-dasharray="6 4"'), ("Ridge", split["predictions"]["ridge"], "#7be0bd", "")]
    maximum = max(value for _, values, _, _ in series for value in values) * 1.15 or 1.0
    plot_width, plot_height = width - left - 16, height - top - bottom
    elements = []
    for tick in range(5):
        value = maximum * tick / 4
        y = top + plot_height * (1 - tick / 4)
        elements.append(f'<line x1="{left}" y1="{y}" x2="{width - 16}" y2="{y}" stroke="#33413e"/><text x="{left - 8}" y="{y + 4}" text-anchor="end" fill="#aebdb7" font-size="11">{value:.0f}</text>')
    for name, values, color, dash in series:
        points = " ".join(f"{left + i * plot_width / max(1, len(values) - 1):.1f},{top + plot_height * (1 - value / maximum):.1f}" for i, value in enumerate(values))
        elements.append(f'<polyline points="{points}" fill="none" stroke="{color}" stroke-width="2.4" {dash}><title>{name}</title></polyline>')
    elements.append(f'<text x="{left}" y="{height - 7}" fill="#aebdb7" font-size="11">{escape(split["test_start"])}</text><text x="{width - 16}" y="{height - 7}" text-anchor="end" fill="#aebdb7" font-size="11">{escape(split["test_end"])}</text>')
    label = escape(f'Pronóstico de {split["sku"]}: demanda observada, referencia estacional y ridge; último bloque de evaluación')
    return f'<svg viewBox="0 0 {width} {height}" role="img" aria-label="{label}"><title>{label}</title>{"".join(elements)}</svg>'


def write_html(report: dict, path: Path) -> None:
    aggregate, methodology = report["aggregate"], report["methodology"]
    data = report["dataset"]
    is_synthetic = data["kind"] == "synthetic"
    source = "Datos sintéticos · experimento reproducible" if is_synthetic else "CSV del usuario · origen declarado por el usuario"
    badge = "DEMO SINTÉTICA" if is_synthetic else "EVALUACIÓN DE CSV"
    reduction = report["ridge_mae_reduction_percent"]
    comparison = "Sin variación relativa definida: la referencia tiene error cero." if reduction is None else (f'Ridge reduce el MAE un {reduction:.2f}% en este conjunto.' if reduction >= 0 else f'Ridge aumenta el MAE un {-reduction:.2f}% en este conjunto.')
    cards = "".join(f'<article class="metric"><span>{label}</span><strong>{number(values["mae"])}</strong><small>MAE · unidades de demanda<br>WAPE {number(values["wape_percent"], "%")}</small></article>' for label, values in (("Referencia estacional", aggregate["seasonal"]), ("Regresión ridge", aggregate["ridge"])))
    rows = "".join(f'<tr><th scope="row">{escape(item["sku"])}</th><td>{item["fold"]}</td><td>{item["train_end"]}</td><td>{item["test_start"]}<br>{item["test_end"]}</td><td>{number(item["metrics"]["seasonal"]["mae"])}</td><td>{number(item["metrics"]["ridge"]["mae"])}</td><td>{number(item["metrics"]["ridge"]["wape_percent"], "%")}</td></tr>' for item in report["splits"])
    sku_rows = "".join(f'<tr><th scope="row">{escape(item["sku"])}</th><td>{number(item["metrics"]["seasonal"]["mae"])}</td><td>{number(item["metrics"]["ridge"]["mae"])}</td><td>{number(item["metrics"]["ridge"]["wape_percent"], "%")}</td></tr>' for item in report["by_sku"])
    last = [split for split in report["splits"] if split["fold"] == methodology["folds"]]
    charts = "".join(f'<article class="chart"><div class="chart-title"><h3>{escape(split["sku"])}</h3><span>Último bloque · {methodology["horizon_days"]} días</span></div>{chart(split)}<details><summary>Ver valores del gráfico</summary><div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Observado</th><th>Estacional</th><th>Ridge</th></tr></thead><tbody>{"".join(f"<tr><td>{day}</td><td>{number(actual)}</td><td>{number(base)}</td><td>{number(ridge)}</td></tr>" for day, actual, base, ridge in zip(split["dates"], split["actual"], split["predictions"]["seasonal"], split["predictions"]["ridge"]))}</tbody></table></div></details></article>' for split in last)
    limits = "".join(f"<li>{escape(limit)}</li>" for limit in report["limits"])
    html = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="DemandLab: experimento reproducible de pronóstico de demanda con validación temporal y comparación estacional."><title>DemandLab · Pronóstico con evidencia</title><style>
:root{{color-scheme:dark;--bg:#101a17;--panel:#182520;--text:#f4f2ee;--muted:#b6c7be;--green:#7be0bd;--line:#34473d}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.65}}main{{max-width:1140px;margin:auto;padding:42px 26px 70px}}a{{color:var(--green);text-underline-offset:4px}}header{{border-bottom:1px solid var(--line);padding-bottom:32px;margin-bottom:32px}}.brand{{font-size:14px;letter-spacing:.13em;font-weight:800;text-transform:uppercase;display:flex;gap:20px;align-items:center;justify-content:space-between}}.pill{{color:var(--green);border:1px solid #476d5c;border-radius:99px;font-size:11px;padding:5px 12px;letter-spacing:.06em}}h1{{font-size:clamp(35px,6vw,64px);max-width:830px;line-height:1.06;letter-spacing:-.05em;margin:32px 0 18px}}.intro{{max-width:800px;font-size:18px;color:var(--muted)}}h2{{font-size:27px;letter-spacing:-.03em;margin:42px 0 14px}}h3{{margin:0;font-size:20px}}p{{margin:10px 0}}.eyebrow{{color:var(--green);font-size:13px}}.metrics{{display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:16px}}.metric,.note,.chart{{border:1px solid var(--line);background:var(--panel);border-radius:16px;padding:24px}}.metric span,.metric small{{display:block;color:var(--muted)}}.metric strong{{display:block;font-size:48px;line-height:1.3;letter-spacing:-.04em;margin:8px 0}}.note{{background:#223c30}}.note strong{{display:block;font-size:20px;line-height:1.35;margin-bottom:10px}}.steps{{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0}}.step{{border-left:2px solid var(--green);padding-left:15px}}.step span{{display:block;color:var(--green);font-size:13px}}.step p,.muted{{color:var(--muted);font-size:14px}}.chart{{margin:16px 0;padding:20px 24px}}.chart-title{{display:flex;justify-content:space-between;align-items:baseline;gap:12px}}.chart-title span{{color:var(--muted);font-size:12px}}svg{{display:block;width:100%;height:auto;margin-top:14px}}.legend{{display:flex;flex-wrap:wrap;gap:22px;color:var(--muted);font-size:14px}}.legend i{{display:inline-block;width:18px;height:3px;vertical-align:middle;margin-right:7px}}table{{border-collapse:collapse;width:100%;font-size:13px;text-align:left}}td,th{{border-bottom:1px solid var(--line);padding:11px 13px;white-space:nowrap}}thead th{{color:var(--muted);font-weight:500}}.table-wrap{{overflow-x:auto;border:1px solid var(--line);border-radius:12px}}summary{{cursor:pointer;color:var(--green);font-size:13px;margin:8px 0}}li{{margin:6px 0;color:var(--muted)}}footer{{border-top:1px solid var(--line);margin-top:32px;padding-top:20px;color:var(--muted);font-size:13px}}code{{overflow-wrap:anywhere}}:focus-visible{{outline:3px solid var(--green);outline-offset:5px}}@media(max-width:720px){{main{{padding:25px 18px}}.metrics,.steps{{grid-template-columns:1fr}}.metric strong{{font-size:40px}}.chart{{padding:15px 10px}}.chart-title{{display:block}}.brand{{align-items:flex-start;font-size:12px}}h2{{font-size:23px}}}}
</style></head><body><main>
<header><div class="brand"><span>DemandLab / Applied ML</span><span class="pill">{badge}</span></div><p class="eyebrow">MVP DE INVESTIGACIÓN · LOGÍSTICA</p><h1>Pronosticar demanda.<br>Medir antes de decidir.</h1><p class="intro">Un experimento de aprendizaje supervisado que compara regresión ridge con la demanda de la semana anterior. Cada pronóstico se calcula con información disponible en su fecha de corte.</p><p class="muted">{source} · {data["observations"]} observaciones · {data["sku_count"]} SKU · {methodology["folds"]} ventanas por SKU</p></header>
<section aria-labelledby="results"><h2 id="results">Resultados del experimento</h2><div class="metrics">{cards}<article class="note"><strong>{comparison}</strong><p>Resultado descriptivo de estos datos. No acredita rendimiento en operaciones reales.</p><a href="report.json">Descargar evidencia JSON</a></article></div><p class="muted">MAE = error absoluto medio. WAPE = suma del error absoluto / suma de demanda observada × 100. Los agregados usan todas las observaciones de evaluación; no promedian porcentajes por SKU.</p></section>
<section aria-labelledby="method"><h2 id="method">Cómo evitamos mirar el futuro</h2><div class="steps"><div class="step"><span>01 / CONTRATO</span><strong>Serie diaria por SKU</strong><p>CSV validado: demanda no negativa, sin duplicados ni días ausentes.</p></div><div class="step"><span>02 / CORTE</span><strong>Entrenamiento anterior</strong><p>Ventanas expansivas. El modelo y la normalización se ajustan solo al pasado.</p></div><div class="step"><span>03 / PRONÓSTICO</span><strong>{methodology["horizon_days"]} días recursivos</strong><p>Las predicciones futuras alimentan los rezagos; nunca las etiquetas de evaluación.</p></div><div class="step"><span>04 / EVIDENCIA</span><strong>Métricas por ventana</strong><p>Baseline, coeficientes, fechas, valores y límites quedan disponibles en JSON.</p></div></div></section>
<section aria-labelledby="forecast"><h2 id="forecast">Pronósticos frente a observaciones</h2><div class="legend"><span><i style="background:#f4f2ee"></i>Observado</span><span><i style="background:#edb56b"></i>Referencia estacional</span><span><i style="background:#7be0bd"></i>Ridge</span></div>{charts}</section>
<section><h2>Comparación por SKU</h2><div class="table-wrap"><table><thead><tr><th>SKU</th><th>MAE estacional</th><th>MAE ridge</th><th>WAPE ridge</th></tr></thead><tbody>{sku_rows}</tbody></table></div><h2>Auditoría de cortes temporales</h2><div class="table-wrap"><table><thead><tr><th>SKU</th><th>Ventana</th><th>Último día entrenado</th><th>Evaluación</th><th>MAE estacional</th><th>MAE ridge</th><th>WAPE ridge</th></tr></thead><tbody>{rows}</tbody></table></div></section>
<section><h2>Alcance y límites</h2><ul>{limits}</ul><p class="muted">Ridge α={methodology["ridge_alpha"]}. Variables: tendencia, seno/coseno semanal, rezagos de 7 y 14 días, medias móviles de 7 y 28 días. La escala se aprende nuevamente en cada entrenamiento.</p></section>
<footer><p>Dataset SHA-256: <code>{escape(data["sha256"])}</code></p><p>Informe generado localmente con DemandLab 0.1.0. Datos y resultados deben revisarse antes de presentar cualquier afirmación de negocio.</p></footer></main></body></html>'''
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
