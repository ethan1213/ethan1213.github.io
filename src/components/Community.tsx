import { Users } from "lucide-react";
import { community } from "../data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Community() {
  return (
    <section id="community" className="py-20 md:py-28 border-t rule">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="04 — Comunidad" title="Charlas y comunidad de IA" />

        <Reveal delay={0.05}>
          <div className="border rule p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full border rule grid place-items-center text-rust-600 dark:text-rust-400">
                <Users size={17} />
              </div>
              <div>
                <p className="font-serif italic text-lg">{community.org}</p>
                <p className="text-sm text-stone-500">{community.role}</p>
              </div>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{community.description}</p>
            <blockquote className="mt-6 border-l-2 border-rust-500 pl-4 font-serif italic text-stone-600 dark:text-stone-400">
              "{community.quote}"
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
