import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { nextProject } from "../data/content";
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
          <div className="border rule border-dashed p-7">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">Próximo proyecto</p>
            <h3 className="font-serif text-2xl">{nextProject.name}</h3>
            <p className="text-sm text-stone-500 mt-1">{nextProject.tagline}</p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">{nextProject.description}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-5 text-xs font-mono text-stone-500">
              {nextProject.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
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
