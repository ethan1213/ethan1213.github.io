"""Reporte HTML autocontenido, sin scripts ni recursos externos."""

import html
import json
from pathlib import Path


LABELS = {
    "recall_at_1": "Recall@1 · recuperables",
    "recall_at_3": "Recall@3 · recuperables",
    "mrr_at_3": "MRR@3 · recuperables",
    "answerable_coverage": "Cobertura · recuperables",
    "evidence_precision": "Precisión de evidencia citada",
    "abstention_recall": "Abstención · sin respuesta",
    "unsupported_evidence_rate": "Evidencia improcedente · sin respuesta ↓",
    "citation_integrity": "Integridad de citas",
}


def percentage(value: float | None) -> str:
    return "No aplica" if value is None else f"{value:.1%}"


def render_html(report: dict) -> str:
    escape = html.escape
    metric_rows = "".join(f"<tr><th scope='row'>{escape(label)}</th><td>{percentage(report['methods']['lexical']['metrics'][key])}</td><td>{percentage(report['methods']['bm25']['metrics'][key])}</td></tr>" for key, label in LABELS.items())
    details = []
    for method, values in report["methods"].items():
        cases = []
        for case in values["cases"]:
            citations = "".join(f"<blockquote>{escape(citation['excerpt'])}<footer>{escape(citation['document_id'])} · {escape(citation['source'])}<br>SHA-256: {escape(citation['sha256'])}</footer></blockquote>" for citation in case["citations"])
            retrieved = ", ".join(f"{hit['document_id']} ({hit['score']:.3f})" for hit in case["retrieved"]) or "Sin coincidencias"
            expected = ", ".join(case["gold_document_ids"]) or "Abstención esperada"
            state = "Evidencia encontrada" if case["status"] == "evidence_found" else "Abstención"
            relevant = case["citations"] and case["citations"][0]["document_id"] in case["gold_document_ids"]
            correct = bool(relevant or (not case["answerable"] and case["status"] == "abstained"))
            cases.append(f"<details><summary><span class='dot {'ok' if correct else 'review'}'></span>{escape(case['id'])} · {escape(case['question'])}<span class='state'>{state}</span></summary><div class='case'><p><strong>Referencia:</strong> {escape(expected)}</p><p><strong>Ranking:</strong> {escape(retrieved)}</p><p><strong>Cobertura léxica:</strong> {percentage(case['query_coverage'])}</p><p>{escape(case['message'])}</p>{citations}</div></details>")
        details.append(f"<section><h2>{'Baseline léxico' if method == 'lexical' else 'BM25'} · casos individuales</h2><p>Verde: cita esperada o abstención correcta. Ámbar: requiere revisión contra la referencia.</p>{''.join(cases)}</section>")
    limits = "".join(f"<li>{escape(item)}</li>" for item in report["limitations"])
    return f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>LLM Evidence Lab · Evaluación de recuperación</title><style>
:root{{color-scheme:light dark;--bg:#f5f3ee;--panel:#fff;--text:#172c2b;--muted:#4f6563;--border:#c8d4cf;--accent:#176859}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,sans-serif;line-height:1.6}}main{{max-width:1100px;margin:auto;padding:48px 24px 80px}}h1{{font-size:clamp(2.3rem,6vw,4.4rem);line-height:1.08;letter-spacing:-.05em;max-width:850px;margin:18px 0}}h2{{font-size:1.35rem}}.eyebrow{{font-size:.8rem;text-transform:uppercase;letter-spacing:.17em;color:var(--accent);font-weight:700}}.intro{{max-width:760px;font-size:1.1rem;color:var(--muted)}}.pills{{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}}.pill{{border:1px solid var(--border);border-radius:30px;padding:5px 12px;font-size:.85rem}}section,.notice{{background:var(--panel);border:1px solid var(--border);border-radius:16px;margin-top:24px;padding:24px}}.notice{{border-left:5px solid var(--accent)}}table{{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}}th,td{{padding:12px;text-align:left;border-bottom:1px solid var(--border)}}td{{text-align:right}}thead th{{text-align:right}}thead th:first-child{{text-align:left}}.table-wrap{{overflow-x:auto}}details{{border-top:1px solid var(--border)}}summary{{padding:16px 0;cursor:pointer;font-weight:600;list-style:none;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}}summary:focus-visible{{outline:3px solid var(--accent);outline-offset:3px}}.state{{font-size:.75rem;color:var(--muted);margin-left:auto}}.dot{{width:8px;height:8px;flex-shrink:0;border-radius:50%;display:inline-block}}.ok{{background:#19846b}}.review{{background:#c47b21}}.case{{padding-bottom:20px;font-size:.92rem}}blockquote{{margin:18px 0;border-left:3px solid var(--accent);padding:10px 18px;background:var(--bg)}}blockquote footer,code{{font-family:ui-monospace,monospace;overflow-wrap:anywhere;font-size:.75rem}}blockquote footer{{margin-top:12px;color:var(--muted)}}.footnote{{color:var(--muted);font-size:.85rem}}@media(prefers-color-scheme:dark){{:root{{--bg:#101c1b;--panel:#172725;--text:#e6eeea;--muted:#b0c2bd;--border:#344d45;--accent:#6bd3b3}}}}@media(max-width:600px){{main{{padding:28px 16px}}section,.notice{{padding:16px}}th,td{{padding:10px 5px;font-size:.84rem}}.state{{width:100%;margin-left:18px}}}}
</style></head><body><main><div class="eyebrow">Ethan Astorga · MVP de investigación</div><h1>Antes de generar,<br>encontrar la evidencia.</h1><p class="intro">Comparación reproducible de un baseline léxico y BM25 para la etapa de recuperación documental de un RAG. Cada cita conserva el fragmento exacto y su huella; cada abstención queda visible.</p><div class="pills"><span class="pill">Datos sintéticos</span><span class="pill">Sin LLM ni embeddings</span><span class="pill">100 % local · Python stdlib</span><span class="pill">{report['document_count']} documentos · {report['question_count']} preguntas</span></div><div class="notice"><strong>Qué demuestra este MVP</strong><p>Recuperación, evaluación con referencias separadas, citas verificables y una política de abstención auditable. No demuestra calidad de generación ni exactitud profesional de documentos.</p></div><section><h2>Comparación de métodos</h2><p>{report['answerable_count']} preguntas con referencia y {report['unanswerable_count']} sin respuesta. Ambas variantes usan el mismo corpus, preguntas y política.</p><div class="table-wrap"><table><thead><tr><th>Métrica</th><th>Léxico</th><th>BM25</th></tr></thead><tbody>{metric_rows}</tbody></table></div><p class="footnote">Recall@k cuenta preguntas con al menos una referencia en los primeros k resultados. MRR@3 promedia el inverso de la primera posición relevante. La precisión de evidencia usa las referencias del benchmark. La integridad solo comprueba texto, origen y huella.</p></section>{''.join(details)}<section><h2>Límites y reproducción</h2><ul>{limits}</ul><p>Política: mínimo {report['policy']['minimum_shared_terms']} términos compartidos y {percentage(report['policy']['minimum_query_coverage'])} de cobertura léxica. BM25: k1={report['bm25']['k1']}, b={report['bm25']['b']}.</p><p><code>python -m llm_evidence_lab evaluate --output artifacts/latest</code></p><p class="footnote">Run: {escape(report['run_id'])}<br>Corpus SHA-256: <code>{escape(report['corpus_sha256'])}</code><br>Preguntas SHA-256: <code>{escape(report['questions_sha256'])}</code></p></section></main></body></html>"""


def write_report(report: dict, output: Path) -> tuple[Path, Path]:
    output.mkdir(parents=True, exist_ok=True)
    json_path, html_path = output / "report.json", output / "report.html"
    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    html_path.write_text(render_html(report), encoding="utf-8")
    return json_path, html_path
