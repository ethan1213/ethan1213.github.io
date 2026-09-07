# AI Privacy Gateway — ficha técnica pública

Fecha de revisión: 7 de septiembre de 2026. Versión del proyecto: v0.1.

## Flujo

PDF/DOCX → detección de posibles datos personales → revisión humana → seudonimización → consulta extractiva del texto protegido → exportación y reporte con hashes.

La versión descrita opera localmente. La consulta es determinista y extractiva: no usa RAG ni un LLM en la nube. Los resultados de detección requieren revisión humana.

## Evidencia consultada

README, arquitectura y documentación de QA del proyecto, junto con la ejecución de CI asociada al commit `2ec5232c74ecd816b403d966a09dda9e6b758840`, finalizada correctamente. La suite documentada incluye controles de arquitectura, pruebas de ausencia de conexiones salientes, contención de datos personales, integridad del chat y seguridad de archivos.

Esta revisión del portafolio no repitió la suite completa del backend. El repositorio es privado; no se ofrece este resumen como una auditoría independiente ni como un paquete íntegramente reproducible por terceros.

## Límites y siguientes pasos

- Detección de nombres heurística, con posibles falsos positivos y negativos.
- Pendiente: evaluación sobre corpus real autorizado, pruebas de carga y documentos extensos.
- Pendiente: empaquetado de distribución y ampliación de pruebas automatizadas de interfaz.
- Las pruebas sobre datos sintéticos no certifican cumplimiento legal.

Este documento no contiene expedientes, datos personales de terceros ni código privado.
