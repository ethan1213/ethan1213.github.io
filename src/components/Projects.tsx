import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile, projects } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { GithubIcon } from "./icons";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-zinc-200 dark:border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="03 · Proyectos" title="Trabajo destacado" />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-glow transition-colors -mt-12"
          >
            <GithubIcon size={16} /> Ver todo en GitHub
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col h-full rounded-2xl border border-zinc-200 dark:border-ink-700 bg-white dark:bg-ink-900/60 p-6 hover:border-cyan-glow/50 hover:-translate-y-1 transition-all duration-300"
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow px-2.5 py-0.5 text-[10px] font-semibold text-ink-950">
                    <Sparkles size={10} /> Destacado
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <h3 className="font-heading font-semibold text-lg">{p.name}</h3>
                  <ArrowUpRight
                    size={18}
                    className="text-zinc-400 group-hover:text-cyan-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                  />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed grow">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-ink-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-500 text-center">
            Se vienen nuevos proyectos de IA — esta sección se actualiza constantemente.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
