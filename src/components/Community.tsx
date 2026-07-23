import { ArrowUpRight, Mic, Users } from "lucide-react";
import { community, talks } from "../data/content";
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

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 pt-6 border-t rule">
              {community.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-rust-600 dark:text-rust-400 hover:underline"
                >
                  {l.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-4">Charlas</p>
          <ul className="divide-y rule border-t border-b rule">
            {talks.map((t) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mic size={15} className="text-stone-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{t.title}</p>
                      <p className="text-sm text-stone-500 mt-0.5">{t.event}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-stone-400 group-hover:text-rust-600 dark:group-hover:text-rust-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
