import { profile, skills } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-zinc-200 dark:border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="01 · Sobre mí" title="Ingeniería de IA con foco práctico" />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14">
          <Reveal delay={0.05} className="space-y-5">
            {profile.about.map((p, i) => (
              <p key={i} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-zinc-200 dark:border-ink-700 bg-zinc-50/60 dark:bg-ink-900/60 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-5">
                Stack
              </p>
              <div className="space-y-5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">{group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-white dark:bg-ink-800 border border-zinc-200 dark:border-ink-700 text-zinc-700 dark:text-zinc-300"
                        >
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
