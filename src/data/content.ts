export const profile = {
  name: "Ethan Astorga",
  fullName: "Ethan Astorga Contreras",
  role: "AI Engineer",
  tagline: "Agentes & RAG · Python / APIs & Microservicios · LLMs on-premise",
  location: "Santiago, Chile",
  availability: "Disponible para nuevas oportunidades",
  pitch:
    "Construyo sistemas de IA listos para producción: agentes, RAG y automatización aplicada a problemas reales.",
  about: [
    "Llegué a la IA por una obsesión simple: que las cosas funcionen solas. Esa idea me llevó de la automatización a construir soluciones que hoy corren en producción — agentes de IA que consultan datos reales, sistemas RAG con embeddings y bases vectoriales, y LLMs on-premise integrados vía APIs REST en Python. Nada salió a la primera; casi todo salió después de romperlo varias veces, y ese ciclo de prototipo a producción es justo lo que más disfruto.",
    "Estudio Ingeniería en Informática en DuocUC (antes cursé 3 años de Ingeniería Civil en Computación en la Universidad Católica del Norte). Cuento con 19 certificaciones, entre ellas Profesional y Experto en IA (CertiProf), AWS Cloud Practitioner y Google Cloud Professional en IA & Data.",
    "Mi forma de trabajar: entender la lógica primero, ponerla en práctica después, y mejorar constantemente.",
  ],
  email: "ethanastorga311@gmail.com",
  github: "https://github.com/ethan1213",
  linkedin: "https://www.linkedin.com/in/ethan-astorga-contreras/",
  avatar: "/images/ethan-avatar.jpeg",
  cv: "/cv/Ethan-Astorga-CV.pdf",
};

export const experience = [
  {
    company: "Samsung Electronics Chile",
    role: "Analista Jr. de Protección de Datos y Automatización",
    type: "Jornada completa",
    period: "Ene 2026 — Jul 2026",
    duration: "7 meses",
    location: "Chile · Presencial",
    description:
      "Agentes de IA, RAG on-premise, pipelines de datos y automatización en producción.",
    highlights: [
      "Agentes de IA y RAG en producción vía un servidor MCP (FastMCP, 7 herramientas, autenticación Bearer) y RAG con embeddings y bases vectoriales (pgvector + ChromaDB) sobre LLMs on-premise (llama.cpp, Qwen 2.5 / Llama 3.1 cuantizados).",
      "BIA Platform (~1.000 usuarios) en Django/Python con APIs REST, integrando modelos de IA externos y locales vía la librería de OpenAI.",
      "Pipeline ETL incremental: ~128.000 registros diarios desde 11 fuentes, orquestado con Prefect 3.",
      "Analítica avanzada: forecasting de demanda (LSTM), detección de anomalías (autoencoder) y modelado de elasticidad de precios.",
      "Protección de datos (Ley 21.719): Privacy by Design, ROPA/DPIA y prácticas de desarrollo seguro (SSDLC).",
    ],
    skills: ["Agentes de IA", "RAG", "MCP", "LLMs on-premise", "ETL", "Ley 21.719"],
  },
  {
    company: "Dual Vision",
    role: "Asistente de Operaciones en Video Analítica",
    type: "Contrato temporal",
    period: "Jun 2025 — Nov 2025",
    duration: "6 meses",
    location: "Región Metropolitana de Santiago, Chile",
    description:
      "Soporte técnico, computer vision y auditoría de calidad de datos para clientes.",
    skills: ["Computer vision", "QA de datos"],
  },
];

export const education = [
  {
    institution: "DuocUC",
    degree: "Ingeniería en Informática, Computer Science",
    period: "Mar 2025 — Nov 2029",
    detail: "Promedio 6.5 / 7.0",
    skills: ["Google Cloud", "Trabajo colaborativo"],
  },
  {
    institution: "Generation Chile",
    degree: "Programa AWS re/Start + Cloud Practitioner",
    period: "Sept 2024 — Feb 2025",
    detail: "Programa intensivo de empleabilidad tech (520 h)",
    skills: ["Scrum", "Trabajo colaborativo", "AWS"],
  },
  {
    institution: "Universidad Católica del Norte",
    degree: "Ingeniería Civil en Computación",
    period: "2021 — 2023",
    detail: "3 años cursados",
    skills: [],
  },
];

export const certifications = [
  {
    name: "Certificación Profesional y Experto en IA",
    issuer: "CertiProf",
    date: "2026",
  },
  {
    name: "Google Cloud Professional — IA & Data",
    issuer: "Google Cloud",
    date: "Certificación asociada",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "AWS re/Start · Generation",
    date: "Feb 2025",
  },
  {
    name: "Red Hat System Administration II (RH134)",
    issuer: "Red Hat",
    date: "Oct 2025",
  },
  {
    name: "Python, ML e IA",
    issuer: "Samsung Innovation Campus",
    date: "2024",
  },
];
export const certificationsTotal = 19;

export const nextProject = {
  name: "Vision AI Platform",
  tagline: "Sistema de visión artificial en tiempo real.",
  description:
    "Detección de objetos, OCR, seguimiento y conteo en tiempo real, con alertas y dashboard.",
  stack: ["YOLO", "OpenCV", "OCR", "DeepSORT"],
};

export const community = {
  org: "Cámara Chilena de Inteligencia Artificial (CCHIA)",
  role: "Socio y Colaborador Técnico (Comisión I+D)",
  description:
    "Participo como socio y colaborador técnico en la Comisión I+D de CCHIA, con acceso a repositorios, documentación y papers de la comunidad. Contribuyo a alejandrIA, una plataforma de IA on-premise con modelos cuantizados personalizados y RAG, que integra modelos locales y APIs externas vía la librería de OpenAI en Python. También participo como expositor — fui parte del webinar 'Marco Integral Ley 21.719: Ética, Regulación y Estrategias de Transformación Tecnológica', junto a Carlos Alberto Martínez.",
  quote:
    "Me gusta asistir a charlas, generar innovación y seguir mejorando constantemente: primero entender la lógica, después ponerla en práctica.",
  links: [
    { label: "Sitio de CCHIA", href: "https://www.cchia.cl/" },
    { label: "CCHIA en LinkedIn", href: "https://www.linkedin.com/company/c%C3%A1mara-chilena-de-inteligencia-artificial" },
  ],
};

export const talks = [
  {
    event: "PyCon Chile 2025 — Viña del Mar",
    title: "DetectVoice: detección de deepfakes de audio",
    href: "https://www.youtube.com/live/qCe_SSpnSno?si=rnuSogVOt9ngdYL9&t=21632",
  },
];

export const skills = {
  "IA / LLMs": ["Agentes de IA", "MCP (FastMCP)", "RAG", "Embeddings", "LLMs on-premise (Ollama, llama.cpp)", "Prompt engineering", "Cuantización / fine-tuning", "PyTorch", "LightGBM"],
  "Bases vectoriales": ["pgvector", "ChromaDB"],
  "Backend": ["Python", "FastAPI", "Django", "Node.js", "APIs REST", "Microservicios", "Nginx"],
  "Java": ["Java 21", "Spring Boot", "Patrón BFF", "Modelo C4"],
  "Datos": ["PostgreSQL", "MongoDB", "Redis", "MySQL", "ETL", "Prefect 3"],
  "Cloud & DevOps": ["Docker", "Git", "AWS (EC2, S3, Lambda, RDS, IAM)", "Linux / RHEL"],
  "En formación": ["LangChain", "LangGraph", "LlamaIndex", "Kubernetes", "AWS SageMaker", "Azure AI"],
};
