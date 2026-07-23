import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { profile } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="absolute inset-0 grid-bg noise-mask" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-gradient-to-br from-cyan-glow/25 to-violet-glow/25 blur-3xl animate-float" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-ink-700 bg-white/60 dark:bg-ink-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-6">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {profile.availability}
            </div>

            <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              Hola, soy {profile.name}.
              <br />
              <span className="text-gradient">{profile.role}</span> aplicado.
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-mono">
              {profile.tagline}
            </p>

            <p className="mt-4 max-w-xl text-base md:text-lg text-zinc-700 dark:text-zinc-300">
              {profile.pitch}
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <MapPin size={14} />
              {profile.location}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 dark:bg-white text-white dark:text-ink-950 px-5 py-2.5 text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Ver proyectos <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-ink-700 px-5 py-2.5 text-sm font-medium hover:border-cyan-glow/60 hover:text-cyan-glow transition-colors"
              >
                Contactar
              </a>

              <div className="flex items-center gap-1 ml-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="size-10 grid place-items-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-white transition-colors"
                >
                  <GithubIcon size={19} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="size-10 grid place-items-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-white transition-colors"
                >
                  <LinkedinIcon size={19} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="size-10 grid place-items-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-white transition-colors"
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="justify-self-center md:justify-self-end"
          >
            <div className="relative size-44 md:size-56">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow opacity-70 blur-md animate-float" />
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="relative size-full rounded-full object-cover border-4 border-white dark:border-ink-950"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
