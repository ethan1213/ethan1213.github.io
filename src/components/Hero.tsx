import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Download, MapPin, ShieldCheck, Fingerprint, FlaskConical } from "lucide-react";
import { profile } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return <section id="top" className="hero-surface pt-32 pb-20 md:pt-44 md:pb-28">
    <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
      <div>
        <div className="flex items-center gap-4 mb-8"><img src={profile.avatar} alt={profile.fullName} width={56} height={56} className="size-14 rounded-2xl object-cover border rule" /><div><p className="text-sm font-medium">{profile.name}</p><p className="flex items-center gap-2 mt-1 text-xs text-stone-500 dark:text-stone-400"><span className="size-1.5 rounded-full bg-emerald-500" />{profile.availability}</p></div></div>
        <p className="eyebrow-label">AI Engineer · Gobernanza de IA y datos</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight mt-5">Construir IA.<br /><span className="text-rust-600 dark:text-rust-400">Ponerla a prueba.</span><br />Explicar sus límites.</h1>
        <p className="mt-6 max-w-xl text-lg text-stone-700 dark:text-stone-300">{profile.pitch}</p>
        <p className="mt-4 text-sm leading-6 text-stone-500 dark:text-stone-400">{profile.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#governance" className="action-primary">Explorar gobernanza <ArrowDown size={16} /></a><a href={profile.cv} download className="action-secondary"><Download size={16} />Descargar CV</a></div>
        <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-stone-500 dark:text-stone-400"><span className="inline-flex items-center gap-1.5"><MapPin size={14} />{profile.location}</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Ethan Astorga"><GithubIcon size={18} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Ethan Astorga"><LinkedinIcon size={18} /></a><a href="#contact" className="underline underline-offset-4">Contactar</a></div>
      </div>
      <aside className="evidence-panel p-6 md:p-8 relative" aria-label="Línea de trabajo en gobernanza">
        <div className="flex items-center justify-between gap-3"><p className="eyebrow-label">Línea de trabajo / 01</p><ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={24} /></div>
        <h2 className="font-serif text-3xl mt-8">Gobernanza que se puede examinar.</h2>
        <p className="text-sm leading-6 text-stone-600 dark:text-stone-400 mt-4">Dos proyectos conectan protección del dato, controles del sistema y evidencia de su comportamiento.</p>
        <div className="mt-7 space-y-3">
          <Link to="/proyectos/ai-privacy-gateway" className="pipeline-link"><Fingerprint size={22} /><div><p className="font-medium text-sm">01 · Proteger el documento</p><p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Privacy Gateway · procesamiento local</p></div><ArrowUpRight size={16} /></Link>
          <Link to="/proyectos/ai-governance-testkit" className="pipeline-link"><FlaskConical size={22} /><div><p className="font-medium text-sm">02 · Evaluar los controles</p><p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Testkit · comparación de defensas</p></div><ArrowUpRight size={16} /></Link>
        </div>
        <div className="mt-7 pt-5 border-t rule flex flex-wrap gap-2">{["Revisión humana", "Datos sintéticos", "Evidencia trazable"].map(item=><span key={item} className="rounded-full border rule px-3 py-1 text-[11px] font-mono text-stone-600 dark:text-stone-400">{item}</span>)}</div>
      </aside>
    </div>
  </section>;
}
