import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data/content";
import { Reveal } from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", value: "ethan-astorga-contreras", href: profile.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "ethan1213", href: profile.github, icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-zinc-200 dark:border-ink-800">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow mb-2">05 · Contacto</p>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl tracking-tight">
            Hablemos de tu próximo proyecto de IA
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {profile.availability} — abierto a roles de AI Engineer, ML y proyectos de agentes de IA en Santiago,
            Chile o remoto.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.06}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-ink-700 p-5 hover:border-cyan-glow/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <l.icon size={18} className="text-cyan-glow" />
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-400 group-hover:text-cyan-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{l.label}</p>
                  <p className="text-sm font-medium mt-0.5 break-all">{l.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
