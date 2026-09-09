import { researchStudies } from "./researchStudies.ts";
export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  stack: string[];
  repo?: string;
  category?: string;
  status?: string;
  overview: string[];
  architecture: { title: string; items: string[] }[];
  howItWorks: string[];
  structure: string;
  considerations: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-governance-testkit", name: "AI Governance Testkit", tagline: "Controles de IA que se pueden poner a prueba.",
    summary: "Laboratorio reproducible para comparar defensas frente a prompt injection, respuestas sin respaldo y errores de cálculo, con evidencia de cada ejecución.",
    year: "2026", category: "Gobernanza", status: "MVP de investigación", stack: ["Python", "pytest", "Evaluación", "Trazabilidad"],
    overview: ["Una política de uso de IA necesita una forma de comprobarse. Este kit convierte controles en casos de prueba y compara el comportamiento de un sistema de demostración con tres niveles de defensa.", "El sistema bajo prueba es determinista y trabaja con datos sintéticos. La comparación permite atribuir cambios a los controles; no mide el comportamiento de un LLM comercial ni certifica seguridad en producción."],
    architecture: [
      { title: "Contrato de evaluación", items: ["Adaptador para el sistema bajo prueba", "Corpus de casos y variaciones", "Controles y umbrales declarados"] },
      { title: "Evidencia", items: ["Resultados por perfil", "Referencias y abstención", "Manifiesto para comprobar integridad"] },
    ],
    howItWorks: ["Definir el control y un caso que pueda hacerlo fallar.", "Ejecutar el mismo corpus contra los perfiles ingenuo, egreso y endurecido.", "Comparar fallos: una prueba útil debe distinguir comportamientos, no aprobar siempre.", "Conservar resultados, versión y alcance de la ejecución para revisarlos después."],
    structure: "datasets/     casos sintéticos\ntests/        suites y mutaciones\nsrc/          adaptadores y sistema de demostración\ngovernance/   controles y umbrales\nevidence/     resultados y manifiestos",
    considerations: ["Comparación local del 7 de septiembre de 2026: 67 fallos en ingenuo, 42 en egreso y 0 en endurecido, sobre 176 pruebas por perfil.", "Los fallos de los perfiles de contraste son intencionales. Cero fallos significa que pasó este corpus, no que el sistema sea invulnerable.", "El código fuente es privado. Se publica un resumen agregado de la ejecución; no se publican el corpus ni archivos internos."],
  },
  {
    slug: "ai-privacy-gateway", name: "AI Privacy Gateway", tagline: "Proteger el documento antes de consultarlo.",
    summary: "Flujo local para detectar y revisar datos personales, seudonimizar documentos y consultar únicamente el texto protegido, con trazabilidad de la transformación.",
    year: "2026", category: "Gobernanza", status: "MVP local v0.1", stack: ["Python", "FastAPI", "React", "Tauri"],
    overview: ["La privacidad empieza antes de enviar una pregunta. Privacy Gateway organiza la ingesta, detección, revisión humana, seudonimización y exportación de documentos en un flujo local.", "La versión v0.1 utiliza un motor de consulta extractivo y determinista sobre texto seudonimizado. No usa un LLM ni RAG en la nube. Su función es construir una base controlada para trabajar con documentos sensibles."],
    architecture: [
      { title: "Capas y contratos", items: ["Dominio y casos de uso separados de adaptadores", "API local y CLI sobre el mismo motor", "Interfaz React y shell Tauri"] },
      { title: "Privacidad y trazabilidad", items: ["Revisión humana antes de transformar", "Reportes sin valores personales originales", "Hashes de entrada y salida", "Pruebas de ausencia de conexiones salientes"] },
    ],
    howItWorks: ["Importar un documento PDF o DOCX en un expediente local.", "Detectar posibles datos personales y permitir que una persona confirme, rechace o agregue hallazgos.", "Seudonimizar antes de habilitar preguntas sobre el documento.", "Responder con fragmentos del texto protegido o declarar falta de evidencia.", "Exportar el documento y un reporte de transformación que permita comprobar su integridad."],
    structure: "domain/          modelos y contratos\napplication/     casos de uso\ninfrastructure/  parsers, detección, almacenamiento y exportación\ninterfaces/      CLI y API local\nfrontend/        revisión y navegación del expediente",
    considerations: ["Verificación local del 7 de septiembre de 2026: 143 pruebas aprobadas, tres controles de frontera correctos y compilación de la interfaz.", "La detección de nombres es heurística y requiere revisión humana. Falta evaluar precisión y exhaustividad sobre un corpus real autorizado.", "El instalador de distribución y pruebas de carga siguen pendientes. La versión actual no certifica cumplimiento legal.", "Repositorio privado: el caso describe arquitectura y límites sin publicar documentos ni código interno."],
  },
  {
    slug: "detectvoice",
    category: "Machine learning", status: "MVP de investigación",
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
    category: "Software", status: "MVP local",
    name: "CiberSegurIA",
    tagline: "SaaS de autodiagnóstico de ciberseguridad para empresas chilenas.",
    summary:
      "Diagnóstico SGSI orientativo con cuestionario completo, puntuación ponderada e informe PDF. Flujo local probado con datos sintéticos.",
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
  {
    slug: "andamio", name: "Andamio", tagline: "Continuidad de trabajo cuando la conexión cambia.",
    summary: "Gestor de proyectos de escritorio con operación local y compartida, registro de conflictos y reglas de progreso derivadas de las tareas.",
    year: "2026", category: "Software", status: "MVP local", repo: "https://github.com/ethan1213/andamio", stack: ["Electron", "Python", "Flask", "SQLite"],
    overview: ["Andamio aborda la coordinación de proyectos en entornos donde una conexión permanente no está garantizada. La aplicación hace explícito si trabaja en modo local o compartido.", "El caso permite revisar decisiones de consistencia y trazabilidad: los conflictos de escritura se registran, y el progreso se calcula a partir de las tareas en vez de editarse arbitrariamente."],
    architecture: [{ title: "Aplicación", items: ["Interfaz de escritorio Electron", "Backend Flask", "Capa de datos SQLite"] }, { title: "Reglas de operación", items: ["Bloqueo optimista", "Registro de conflictos", "Progreso derivado", "Pruebas con bases temporales aisladas"] }],
    howItWorks: ["Identificar el modo disponible al iniciar.", "Organizar tareas y estimaciones de un proyecto.", "Registrar las operaciones locales y reconciliar cambios al recuperar la conexión.", "Rechazar escrituras en conflicto y conservar una bitácora del intento."],
    structure: "backend/   API y acceso a datos\ntests/     conflictos, reglas e aislamiento\nscripts/   utilidades de desarrollo y operación",
    considerations: ["61 pruebas aprobadas y demo local aislada ejecutada. Las pruebas de carga y concurrencia en una red real siguen pendientes.", "La compatibilidad del almacenamiento compartido debe evaluarse en la infraestructura de destino antes de recomendar un despliegue.", "Se presenta como evidencia de ingeniería de software, sin atribuirle capacidades de IA que no necesita."],
  },
  ...researchStudies,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
