import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { Reveal, SectionHeading } from "./Reveal";
import { GithubIcon } from "./icons";

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 border-t rule">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="03 — Proyectos" title="Casos de estudio" />

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link
                to={`/proyectos/${c.slug}`}
                className="group flex flex-col h-full border rule p-7 hover:border-rust-500 dark:hover:border-rust-400 transition-colors"
              >
                <p className="text-xs font-mono text-stone-500">{c.year}</p>
                <h3 className="font-serif text-2xl mt-2">{c.name}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-3 leading-relaxed grow">{c.summary}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-5 text-xs font-mono text-stone-500">
                  {c.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-medium text-rust-600 dark:text-rust-400">
                  Ver caso completo
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <div className="border rule border-dashed p-6">
            <p className="text-sm font-medium mb-3">Próximamente</p>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <span className="font-mono text-rust-600 dark:text-rust-400">BIA con IA</span> — Business Impact
                Analysis automatizado para continuidad de negocio (ISO 22301), en la línea de CiberSegurIA.
              </li>
              <li>
                <span className="font-mono text-rust-600 dark:text-rust-400">Agentes con Google ADK</span> —
                explorando agentes de IA multi-paso.
              </li>
              <li>
                <span className="font-mono text-rust-600 dark:text-rust-400">Power Platform</span> — explorando
                Power Automate y Copilot Studio para automatización empresarial.
              </li>
              <li>
                <span className="font-mono text-rust-600 dark:text-rust-400">Kiro</span> — explorando desarrollo
                asistido por IA para nuevos proyectos.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <a
            href="https://github.com/ethan1213"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <GithubIcon size={14} /> Ver todo en GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
