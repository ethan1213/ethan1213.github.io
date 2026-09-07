import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, AudioLines, PanelsTopLeft } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { nextProject } from "../data/content";
import { SectionHeading } from "./Reveal";

const categories = ["Todos", ...new Set(caseStudies.map(study => study.category ?? "Software"))];
export function Projects() {
  const [category, setCategory] = useState("Todos");
  const visible = caseStudies.filter(study => category === "Todos" || study.category === category);
  return <section id="projects" className="py-20 md:py-28 border-t rule">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeading eyebrow="01 — Proyectos" title="Una idea se defiende con evidencia." />
      <p className="max-w-2xl -mt-6 mb-8 text-stone-600 dark:text-stone-400">Gobernanza, privacidad, machine learning y software. Cada caso explica el problema, su arquitectura y qué se ha verificado.</p>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrar proyectos por especialidad">{categories.map(item=><button key={item} type="button" aria-pressed={item===category} onClick={()=>setCategory(item)} className="project-filter">{item}<span className="font-mono text-xs opacity-70 ml-2">{item==="Todos" ? caseStudies.length : caseStudies.filter(study=>study.category===item).length}</span></button>)}</div>
      <p className="sr-only" aria-live="polite">{visible.length} proyectos en {category}</p>
      <div className="grid md:grid-cols-2 gap-5">
        {visible.map(study => { const Icon = study.category === "Gobernanza" ? ShieldCheck : study.category === "Machine learning" ? AudioLines : PanelsTopLeft; return <Link key={study.slug} to={`/proyectos/${study.slug}`} className="project-card group">
          <div className="flex items-center justify-between gap-3"><span className="eyebrow-label">{study.category}</span><Icon size={26} className="text-emerald-600 dark:text-emerald-400" /></div>
          <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-mono"><span className="rounded-full bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 px-3 py-1">{study.status}</span><span className="rounded-full border rule px-3 py-1 text-stone-500 dark:text-stone-400">{study.repo ? "Código público" : "Caso técnico · código privado"}</span></div>
          <h3 className="font-serif text-3xl mt-4 tracking-tight">{study.name}</h3><p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400 grow">{study.summary}</p>
          <div className="flex flex-wrap gap-2 mt-6">{study.stack.map(item=><span key={item} className="text-[11px] font-mono border rule rounded-md px-2 py-1 text-stone-500 dark:text-stone-400">{item}</span>)}</div>
          <div className="mt-7 pt-5 border-t rule flex justify-between items-center text-sm font-medium"><span>Examinar el caso</span><ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /></div>
        </Link>; })}
      </div>
      <div className="mt-8 rounded-2xl border border-dashed rule p-7"><p className="eyebrow-label">En preparación</p><h3 className="font-serif text-2xl mt-3">{nextProject.name}</h3><p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{nextProject.tagline}</p><p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">{nextProject.description}</p><p className="mt-4 text-xs font-mono text-stone-500 dark:text-stone-400">{nextProject.stack.join(" · ")}</p></div>
      <a href="https://github.com/ethan1213" target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center mt-7 text-sm text-rust-600 dark:text-rust-400">Explorar repositorios públicos<ArrowUpRight size={16} /></a>
    </div>
  </section>;
}
