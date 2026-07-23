import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { otherProjects } from "../data/content";
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
          <p className="text-sm text-stone-500 border rule border-dashed p-5">
            Se vienen más proyectos de IA — esta sección se actualiza constantemente.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-5">Otros proyectos</p>
          <ul className="divide-y rule border-t border-b rule">
            {otherProjects.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-sm text-stone-500 mt-0.5 line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs font-mono text-stone-400">{p.tags.join(" · ")}</span>
                    <ArrowUpRight size={15} className="text-stone-400 group-hover:text-rust-600 dark:group-hover:text-rust-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/ethan1213"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm text-stone-500 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <GithubIcon size={14} /> Ver todo en GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
