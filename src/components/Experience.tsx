import { Briefcase, GraduationCap, Award } from "lucide-react";
import { certifications, certificationsTotal, education, experience } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-zinc-200 dark:border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="02 · Trayectoria" title="Experiencia, educación y certificaciones" />

        <div className="grid lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={16} className="text-cyan-glow" />
              <h3 className="font-heading font-semibold text-lg">Experiencia</h3>
            </div>
            <ol className="space-y-8 border-l border-zinc-200 dark:border-ink-700 pl-6">
              {experience.map((e) => (
                <li key={e.company} className="relative">
                  <span className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow" />
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{e.period} · {e.duration}</p>
                  <p className="font-medium mt-1">{e.role}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.company} · {e.type}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{e.location}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{e.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={16} className="text-cyan-glow" />
              <h3 className="font-heading font-semibold text-lg">Educación</h3>
            </div>
            <ol className="space-y-8 border-l border-zinc-200 dark:border-ink-700 pl-6">
              {education.map((e) => (
                <li key={e.institution} className="relative">
                  <span className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow" />
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{e.period}</p>
                  <p className="font-medium mt-1">{e.institution}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.degree}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{e.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Award size={16} className="text-cyan-glow" />
              <h3 className="font-heading font-semibold text-lg">Certificaciones</h3>
            </div>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="rounded-xl border border-zinc-200 dark:border-ink-700 bg-zinc-50/60 dark:bg-ink-900/60 p-4"
                >
                  <p className="font-medium text-sm leading-snug">{c.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {c.issuer} · {c.date}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/ethan-astorga-contreras/details/certifications/"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm font-medium text-cyan-glow hover:underline"
            >
              Ver las {certificationsTotal} certificaciones en LinkedIn →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
