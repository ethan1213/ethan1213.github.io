export const evidence: Record<string, { focus: string; scope: string; links: { label: string; href: string; description: string }[] }> = {
  "ai-governance-testkit": {
    focus: "Evaluación, controles y evidencia reproducible",
    scope: "Ejecución local de tres perfiles sobre la misma suite. Resumen agregado disponible; código y corpus privados. Sistema de demostración determinista, sin LLM comercial.",
    links: [{ label: "Resumen de la ejecución (JSON)", href: "/evidence/governance-comparison.json", description: "Fecha, versión, método, resultados y límites de las 176 pruebas por perfil." }],
  },
  "ai-privacy-gateway": {
    focus: "Privacidad de documentos y control del flujo de datos",
    scope: "Caso basado en la arquitectura, documentación de QA y CI del proyecto. El repositorio permanece privado. El resumen distingue controles implementados de validación pendiente.",
    links: [{ label: "Ficha de arquitectura y verificación", href: "/evidence/privacy-gateway.md", description: "Flujo local, método de revisión, verificación consultada y limitaciones." }],
  },
  andamio: {
    focus: "Continuidad offline y consistencia de datos",
    scope: "Documentación y pruebas presentes en el repositorio público. Se verificó su existencia; no se ejecutaron pruebas de carga ni una red multiusuario en esta revisión.",
    links: [{ label: "Pruebas de conflictos", href: "https://github.com/ethan1213/andamio/blob/384fb28107e332a753d0ae359bacb68a062185c1/tests/test_sync_conflict.py", description: "Bloqueo optimista y registro de cambios que no pudieron guardarse." }, { label: "Pruebas de aislamiento", href: "https://github.com/ethan1213/andamio/blob/384fb28107e332a753d0ae359bacb68a062185c1/tests/test_aislamiento.py", description: "Separación entre bases temporales de pruebas y datos de operación." }],
  },
  detectvoice: {
    focus: "Machine learning de audio y evaluación de robustez",
    scope: "Código público de entrenamiento y evaluación. Los enlaces permiten inspeccionar la implementación; no equivalen a una validación independiente de rendimiento ni a un despliegue en producción.",
    links: [
      { label: "Evaluación de robustez", href: "https://github.com/ethan1213/DetectVoice/blob/54c789450b60f3ab75d75329f01f4a83884f4f77/detectvoice_adversarial/src/evaluation/robustness_eval.py", description: "Revisar cómo se evalúa el detector frente a perturbaciones." },
      { label: "Pruebas de ataques", href: "https://github.com/ethan1213/DetectVoice/blob/54c789450b60f3ab75d75329f01f4a83884f4f77/detectvoice_adversarial/tests/test_attacks.py", description: "Inspeccionar los casos de prueba incluidos en esta versión." },
      { label: "Notebook de exploración", href: "https://github.com/ethan1213/DetectVoice/blob/54c789450b60f3ab75d75329f01f4a83884f4f77/detectvoice_adversarial/notebooks/robustness_demo.ipynb", description: "Recorrer el ejemplo de robustez documentado en el proyecto." },
    ],
  },
  ciberseguria: {
    focus: "Backend Python, datos y generación de reportes",
    scope: "MVP con código público. El cuestionario y sus reportes muestran una implementación de software; su puntuación no certifica cumplimiento normativo ni sustituye una revisión profesional.",
    links: [
      { label: "Aplicación FastAPI", href: "https://github.com/ethan1213/CiberSegurIA/blob/b9f798d2c1e55eea82387654703c280d51246521/main.py", description: "Revisar las rutas y el flujo de la aplicación." },
      { label: "Generación de PDF", href: "https://github.com/ethan1213/CiberSegurIA/blob/b9f798d2c1e55eea82387654703c280d51246521/pdf_generator.py", description: "Ver cómo se transforma la evaluación en un reporte." },
      { label: "Guía de ejecución", href: "https://github.com/ethan1213/CiberSegurIA/blob/b9f798d2c1e55eea82387654703c280d51246521/QUICKSTART.md", description: "Consultar los pasos de instalación y ejecución del MVP." },
    ],
  },
};
