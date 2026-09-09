# LLM Evidence Lab

MVP de investigación de recuperación y evaluación para RAG. Python 3.10+, sin dependencias obligatorias. Corpus sintético: 8 documentos y 12 preguntas de evaluación separadas. No se ajustaron hiperparámetros a los resultados del benchmark.

```bash
python -m unittest discover -s tests -v
python -m llm_evidence_lab evaluate
python -m llm_evidence_lab search "presupuesto de campaña"
```

Abrir `artifacts/latest/report.html` y su JSON. Compara baseline léxico y BM25, mide recuperación, integridad de citas y abstención. Las preguntas sin respuesta que comparten vocabulario pueden ser aceptadas por la heurística: los errores se conservan en el informe. Una cita íntegra no garantiza suficiencia semántica ni exactitud profesional.

## Adaptador opcional de LLM

`llm_evidence_lab.ollama.generate_local(question, evidence, model)` permite consultar un Ollama existente en loopback. Requiere nombre explícito de un modelo ya instalado. Tiene timeout, salida JSON, validación de IDs citados y estado de revisión humana. No descarga modelos, no usa proxies y no consulta el modelo si falta evidencia. La respuesta del LLM se considera borrador: no se verifica automáticamente su respaldo semántico.

Las pruebas del adaptador usan transporte simulado. **No se ejecutó un modelo real en esta entrega.** El benchmark por defecto no usa LLM ni embeddings y lo declara en HTML y JSON. Para evaluar generación real: registrar modelo/digest/configuración, reservar preguntas nuevas, anotar fidelidad semántica, abstención, latencia y variabilidad; comparar contra la recuperación sola.

No hay asesoría jurídica, resultados de clientes ni promesa de invulnerabilidad. El corpus es material de demostración, no normas vigentes.
