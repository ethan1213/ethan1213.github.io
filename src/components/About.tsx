import { profile, skills } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t rule">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="01 — Sobre mí" title="Ingeniería de IA con foco práctico" />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14">
          <Reveal delay={0.05} className="space-y-5">
            {profile.about.map((p, i) => (
              <p key={i} className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border rule p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-5">Stack</p>
              <div className="space-y-5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-500 mb-2">{group}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                      {items.map((s) => (
                        <span key={s} className="text-sm font-mono text-stone-700 dark:text-stone-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
