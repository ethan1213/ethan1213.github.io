import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { profile } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1"
          >
            <div className="size-24 md:size-32 rounded-full overflow-hidden border border-stone-300 dark:border-stone-700">
              <img src={profile.avatar} alt={profile.fullName} className="size-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-5">
              <span className="size-1.5 rounded-full bg-rust-500" />
              {profile.availability}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] tracking-tight">
              {profile.name}
              <span className="block italic text-stone-500 dark:text-stone-400 mt-1">{profile.role} aplicado.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-stone-700 dark:text-stone-300">{profile.pitch}</p>

            <p className="mt-3 font-mono text-sm text-stone-500 dark:text-stone-500">{profile.tagline}</p>

            <div className="mt-3 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-500">
              <MapPin size={14} />
              {profile.location}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border-b border-stone-900 dark:border-white pb-0.5 text-sm font-medium hover:gap-3 hover:text-rust-600 dark:hover:text-rust-400 hover:border-rust-600 dark:hover:border-rust-400 transition-all"
              >
                Ver proyectos <ArrowDown size={14} />
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                Contactar
              </a>

              <div className="flex items-center gap-3 ml-1 text-stone-500 dark:text-stone-500">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  <GithubIcon size={18} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  <LinkedinIcon size={18} />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
