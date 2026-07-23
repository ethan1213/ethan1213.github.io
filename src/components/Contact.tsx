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
    <section id="contact" className="py-20 md:py-28 border-t rule">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-rust-600 dark:text-rust-400 mb-3">05 — Contacto</p>
          <h2 className="font-serif text-3xl md:text-[2.75rem] leading-tight tracking-tight">
            Hablemos de tu próximo proyecto de IA.
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            {profile.availability} — abierto a roles de AI Engineer, ML y proyectos de agentes de IA en Santiago,
            Chile o remoto.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-3 border-t border-l rule">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.06}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex flex-col gap-3 border-b border-r rule p-6 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors h-full"
              >
                <div className="flex items-center justify-between text-stone-500">
                  <l.icon size={17} className="text-rust-600 dark:text-rust-400" />
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">{l.label}</p>
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
