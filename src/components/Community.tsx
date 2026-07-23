import { Users } from "lucide-react";
import { community } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Community() {
  return (
    <section id="community" className="py-24 md:py-32 border-t border-zinc-200 dark:border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="04 · Comunidad" title="Charlas y comunidad de IA" />

        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-zinc-200 dark:border-ink-700 bg-gradient-to-br from-cyan-glow/5 to-violet-glow/5 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-white dark:bg-ink-800 border border-zinc-200 dark:border-ink-700 grid place-items-center">
                <Users size={18} className="text-cyan-glow" />
              </div>
              <div>
                <p className="font-heading font-semibold">{community.org}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{community.role}</p>
              </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{community.description}</p>
            <blockquote className="mt-6 border-l-2 border-cyan-glow pl-4 italic text-zinc-600 dark:text-zinc-400">
              "{community.quote}"
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
