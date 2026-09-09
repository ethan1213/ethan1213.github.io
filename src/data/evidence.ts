export const evidence: Record<string, { focus: string; scope: string; links: { label: string; href: string; description: string }[] }> = {
  "ai-governance-testkit": {
    focus: "Evaluación, controles y evidencia reproducible",
    scope: "Ejecución local de tres perfiles sobre la misma suite. Resumen agregado disponible; código y corpus privados. Sistema de demostración determinista, sin LLM comercial.",
    links: [{ label: "Resumen de la ejecución (JSON)", href: "/evidence/governance-comparison.json", description: "Fecha, versión, método, resultados y límites de las 176 pruebas por perfil." }],
  },
  "ai-privacy-gateway": {
    focus: "Privacidad de documentos y control del flujo de datos",
    scope: "Verificación local: 143 pruebas y tres controles de frontera aprobados; interfaz compilada. El repositorio permanece privado. La evaluación con documentos reales y el instalador siguen pendientes.",
    links: [{ label: "Ficha de arquitectura y verificación", href: "/evidence/privacy-gateway.md", description: "Flujo local, método de revisión, verificación consultada y limitaciones." }],
  },
  andamio: {
    focus: "Continuidad offline y consistencia de datos",
    scope: "61 pruebas aprobadas y demo local aislada ejecutada. Verifica progreso ponderado y acceso a la interfaz con datos sintéticos. Las pruebas de carga y de una red multiusuario real siguen pendientes.",
    links: [{ label: "Demo local y alcance", href: "https://github.com/ethan1213/andamio/blob/884818499d24ef027b8f39cbe6211aaf8ef71777/MVP.md", description: "Instalación, datos sintéticos y comando de comprobación." }, { label: "Pruebas de conflictos", href: "https://github.com/ethan1213/andamio/blob/884818499d24ef027b8f39cbe6211aaf8ef71777/tests/test_sync_conflict.py", description: "Bloqueo optimista y registro de cambios que no pudieron guardarse." }, { label: "Pruebas de aislamiento", href: "https://github.com/ethan1213/andamio/blob/884818499d24ef027b8f39cbe6211aaf8ef71777/tests/test_aislamiento.py", description: "Separación entre bases temporales de pruebas y datos de operación." }],
  },
  detectvoice: {
    focus: "Machine learning de audio y evaluación de robustez",
    scope: "Ocho pruebas aprobadas y demo CPU ejecutada con CNNDetector y perturbaciones FGSM/PGD. La demo usa tensores sintéticos y pesos aleatorios: verifica ejecución y límites, no precisión sobre voces reales.",
    links: [
      { label: "Evaluación de robustez", href: "https://github.com/ethan1213/DetectVoice/blob/a749273ae74c1b565a8f4bfbbad7058e0d9034c9/detectvoice_adversarial/src/evaluation/robustness_eval.py", description: "Revisar cómo se evalúa el detector frente a perturbaciones." },
      { label: "Pruebas de ataques", href: "https://github.com/ethan1213/DetectVoice/blob/a749273ae74c1b565a8f4bfbbad7058e0d9034c9/detectvoice_adversarial/tests/test_attacks.py", description: "Inspeccionar los casos de prueba incluidos en esta versión." },
      { label: "Demo CPU y alcance", href: "https://github.com/ethan1213/DetectVoice/blob/a749273ae74c1b565a8f4bfbbad7058e0d9034c9/MVP.md", description: "Reproducir la demo mínima y entender sus límites." },
    ],
  },
  ciberseguria: {
    focus: "Backend Python, datos y generación de reportes",
    scope: "Prueba de aceptación aprobada: registro, respuestas completas, puntuación, PDF y aislamiento entre cuentas. El cuestionario es orientativo; su puntuación no certifica cumplimiento normativo.",
    links: [
      { label: "Aplicación FastAPI", href: "https://github.com/ethan1213/CiberSegurIA/blob/fe1c1a836c5a4bad37b350ff099e86d5f9491ce5/main.py", description: "Revisar las rutas y el flujo de la aplicación." },
      { label: "Generación de PDF", href: "https://github.com/ethan1213/CiberSegurIA/blob/fe1c1a836c5a4bad37b350ff099e86d5f9491ce5/pdf_generator.py", description: "Ver cómo se transforma la evaluación en un reporte." },
      { label: "Guía de ejecución", href: "https://github.com/ethan1213/CiberSegurIA/blob/fe1c1a836c5a4bad37b350ff099e86d5f9491ce5/MVP.md", description: "Consultar los pasos de instalación y ejecución del MVP." },
    ],
  },
"demandlab": {"focus": "Pronóstico supervisado y evaluación temporal", "scope": "19 pruebas aprobadas. Demo sintética reproducible; revisar el caso para distinguir el núcleo probado de validaciones pendientes.", "links": [{"label": "Explorar demo y resultados", "href": "/demos/demandlab/", "description": "Informe autocontenido con datos sintéticos, método y límites."}, {"label": "Evidencia JSON", "href": "/demos/demandlab/report.json", "description": "Resultados completos de la ejecución reproducible."}, {"label": "Descargar código de la demo", "href": "/demos/demandlab/source.zip", "description": "Python, datos sintéticos, pruebas y guía para ejecutar localmente."}]},
"llm-evidence-lab": {"focus": "Recuperación, citas y abstención", "scope": "12 pruebas aprobadas. Demo sintética reproducible; revisar el caso para distinguir el núcleo probado de validaciones pendientes.", "links": [{"label": "Explorar demo y resultados", "href": "/demos/llm-evidence-lab/", "description": "Informe autocontenido con datos sintéticos, método y límites."}, {"label": "Evidencia JSON", "href": "/demos/llm-evidence-lab/report.json", "description": "Resultados completos de la ejecución reproducible."}, {"label": "Descargar código de la demo", "href": "/demos/llm-evidence-lab/source.zip", "description": "Python, datos sintéticos, pruebas y guía para ejecutar localmente."}]},
"compliance-ai-chile": {"focus": "Evaluación de controles y acceso por rol", "scope": "11 pruebas aprobadas. Demo sintética reproducible; revisar el caso para distinguir el núcleo probado de validaciones pendientes.", "links": [{"label": "Explorar demo y resultados", "href": "/demos/compliance-ai-chile/", "description": "Informe autocontenido con datos sintéticos, método y límites."}, {"label": "Evidencia JSON", "href": "/demos/compliance-ai-chile/report.json", "description": "Resultados completos de la ejecución reproducible."}]},
};
