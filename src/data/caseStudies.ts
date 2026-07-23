export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  stack: string[];
  repo: string;
  overview: string[];
  architecture: { title: string; items: string[] }[];
  howItWorks: string[];
  structure: string;
  considerations: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "detectvoice",
    name: "DetectVoice",
    tagline: "Detección de deepfakes de audio, con evaluación de robustez adversarial.",
    summary:
      "Framework para entrenar, evaluar y desplegar detectores de voces falsas — y medir qué tan bien resisten ataques diseñados para engañarlos.",
    year: "2024 — presente",
    stack: ["Python", "PyTorch", "ONNX", "TorchScript"],
    repo: "https://github.com/ethan1213/DetectVoice",
    overview: [
      "DetectVoice nació como proyecto final del curso SIC AI 2024 (Samsung Innovation Campus) y evolucionó hacia un framework de investigación defensiva: no solo detecta audio sintético, sino que mide qué tan bien resiste esa detección frente a ataques adversariales diseñados deliberadamente para engañarla.",
      "La pregunta que responde no es solo '¿esta voz es falsa?', sino '¿qué tan fácil es hacer que mi detector se equivoque, y cómo lo hago más robusto?'.",
    ],
    architecture: [
      {
        title: "Modelos de detección",
        items: [
          "CNN",
          "RNN (LSTM / GRU)",
          "CRNN",
          "Transformer",
          "Autoencoder",
          "Redes siamesas",
          "Discriminadores GAN para análisis forense",
          "Ensamble con explicabilidad",
        ],
      },
      {
        title: "Ataques adversariales evaluados",
        items: [
          "FGSM (Fast Gradient Sign Method)",
          "PGD (Projected Gradient Descent)",
          "Carlini & Wagner (C&W)",
          "DeepFool",
          "Perturbaciones espectrales y temporales",
        ],
      },
      {
        title: "Evaluación",
        items: [
          "AUROC, Precision, Recall, F1",
          "Matrices de confusión y curvas ROC",
          "Robustez ante cada tipo de ataque",
          "Exportación a PyTorch, TorchScript y ONNX",
        ],
      },
    ],
    howItWorks: [
      "Los audios se organizan en train/val, separados en carpetas real/ y fake/, usando datasets como ASVspoof 2019, LibriTTS y AUDETER.",
      "Cada arquitectura (CNN, RNN, CRNN, Transformer...) se entrena por separado a partir de un archivo de configuración YAML.",
      "Los modelos entrenados se someten a ataques adversariales (FGSM, PGD, C&W, DeepFool) para medir cuánto se degrada su precisión bajo presión.",
      "La suite de evaluación calcula métricas (AUROC, F1, matrices de confusión) y las guarda automáticamente como artefactos versionados.",
      "Los modelos que pasan el corte se exportan a PyTorch, TorchScript u ONNX, listos para integrarse en un pipeline de producción.",
    ],
    structure: `src/
├── models/       CNN, RNN, CRNN, Transformer, autoencoder, siamesas
├── attacks/      FGSM, PGD, C&W, DeepFool
├── training/     entrenamiento estándar y adversarial
├── evaluation/   suite de evaluación de robustez
├── export/       exportación PyTorch / TorchScript / ONNX
└── utils/        procesamiento de audio, dataloaders, config
artifacts/        modelos, métricas, gráficos
notebooks/        exploración en Jupyter
tests/            pruebas unitarias`,
    considerations: [
      "Uso exclusivamente defensivo: investigación, auditoría de seguridad y mejora de detectores — no para crear deepfakes ni clonar voces sin consentimiento.",
      "Licenciado bajo MIT con cláusulas explícitas de uso ético.",
    ],
  },
  {
    slug: "ciberseguria",
    name: "CiberSegurIA",
    tagline: "SaaS de autodiagnóstico de ciberseguridad para empresas chilenas.",
    summary:
      "'Diagnóstico SGSI Express': un cuestionario que mide cumplimiento legal y genera un reporte PDF automático — pensado tanto como producto como código.",
    year: "2025",
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "ReportLab", "JWT"],
    repo: "https://github.com/ethan1213/CiberSegurIA",
    overview: [
      "Diagnóstico SGSI Express es un MVP tipo 'tripwire': un cuestionario de 30 preguntas que evalúa a empresas chilenas contra la Ley 21.663 (Marco de Ciberseguridad) y la Ley 21.096 (Protección de Datos Personales).",
      "Al terminar, la empresa recibe un reporte PDF con puntaje de cumplimiento, brechas detectadas y recomendaciones — y cada diagnóstico completado se convierte en un lead calificado para servicios de consultoría. El diseño del producto está tan pensado como el código.",
    ],
    architecture: [
      {
        title: "Backend",
        items: [
          "FastAPI como framework principal",
          "SQLAlchemy como ORM",
          "SQLite en desarrollo (migración a PostgreSQL/MySQL en producción)",
          "Autenticación con JWT + sesiones (Passlib, python-jose)",
        ],
      },
      {
        title: "Generación de reportes",
        items: [
          "ReportLab para el PDF final",
          "Plantillas Jinja2",
          "Scoring automático de cumplimiento por dominio y criticidad",
        ],
      },
      {
        title: "Modelo de datos",
        items: [
          "User — empresa, RUT, email, password hasheada",
          "Assessment — sesión de diagnóstico, puntaje, estado",
          "Question — 30 preguntas por dominio, con ponderación y referencia legal",
          "Answer — respuestas con evidencia opcional adjunta",
        ],
      },
    ],
    howItWorks: [
      "La empresa se registra con su RUT y datos de contacto.",
      "Responde un cuestionario de 30 preguntas (Sí / No / Parcial / N/A) organizadas por dominio de cumplimiento, pudiendo adjuntar evidencia.",
      "El sistema calcula un puntaje de cumplimiento ponderado por la criticidad de cada pregunta.",
      "Se genera automáticamente un reporte PDF profesional con el diagnóstico, las brechas detectadas y recomendaciones concretas.",
      "El reporte funciona como gancho comercial: cada diagnóstico completado queda registrado como lead calificado.",
    ],
    structure: `main.py             aplicación FastAPI
models.py           modelos SQLAlchemy
database.py         configuración de base de datos
auth.py             autenticación JWT
pdf_generator.py    generación de reportes PDF
seed.py             carga de las 30 preguntas iniciales
templates/          plantillas Jinja2
static/             CSS y assets`,
    considerations: [
      "Pensado explícitamente como generador de leads, no solo como herramienta técnica.",
      "Roadmap: dashboard administrativo, benchmarking comparativo, exportación a Excel, integración con CRM, notificaciones por email, planes por suscripción.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
