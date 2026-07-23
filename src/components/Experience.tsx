import { Briefcase, GraduationCap, Award } from "lucide-react";
import { certifications, certificationsTotal, education, experience } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 border-t rule">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="02 — Trayectoria" title="Experiencia, educación y certificaciones" />

        <div className="grid lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-stone-500">
              <Briefcase size={15} />
              <h3 className="font-serif italic text-lg text-stone-950 dark:text-stone-50">Experiencia</h3>
            </div>
            <ol className="space-y-8 border-l rule pl-6">
              {experience.map((e) => (
                <li key={e.company} className="relative">
                  <span className="absolute -left-[27px] top-1 size-2 rounded-full bg-rust-600 dark:bg-rust-400" />
                  <p className="text-xs font-mono text-stone-500">{e.period} · {e.duration}</p>
                  <p className="font-medium mt-1">{e.role}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{e.company} · {e.type}</p>
                  <p className="text-sm text-stone-500 mt-1">{e.location}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">{e.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-stone-500">
              <GraduationCap size={15} />
              <h3 className="font-serif italic text-lg text-stone-950 dark:text-stone-50">Educación</h3>
            </div>
            <ol className="space-y-8 border-l rule pl-6">
              {education.map((e) => (
                <li key={e.institution} className="relative">
                  <span className="absolute -left-[27px] top-1 size-2 rounded-full bg-rust-600 dark:bg-rust-400" />
                  <p className="text-xs font-mono text-stone-500">{e.period}</p>
                  <p className="font-medium mt-1">{e.institution}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{e.degree}</p>
                  <p className="text-sm text-stone-500 mt-1">{e.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-stone-500">
              <Award size={15} />
              <h3 className="font-serif italic text-lg text-stone-950 dark:text-stone-50">Certificaciones</h3>
            </div>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <li key={c.name} className="border-b rule pb-4 last:border-b-0">
                  <p className="font-medium text-sm leading-snug">{c.name}</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {c.issuer} · {c.date}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/ethan-astorga-contreras/details/certifications/"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm font-medium text-rust-600 dark:text-rust-400 hover:underline"
            >
              Ver las {certificationsTotal} certificaciones en LinkedIn →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
