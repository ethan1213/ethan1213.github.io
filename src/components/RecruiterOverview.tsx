import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";
import { profile } from "../data/content";
import { caseStudies } from "../data/caseStudies";
import { evidence } from "../data/evidence";

export function RecruiterOverview() {
  return (
    <section aria-labelledby="recruiter-title" className="pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="border rule rounded-2xl p-6 md:p-9 bg-white dark:bg-stone-900/40">
          <p className="font-mono text-xs uppercase tracking-widest text-rust-600 dark:text-rust-400">Para equipos que buscan talento en IA</p>
          <h2 id="recruiter-title" className="font-serif text-3xl mt-3">Del perfil al código.</h2>
          <p className="mt-4 max-w-2xl text-stone-600 dark:text-stone-300">Explora mi experiencia en IA aplicada, gobernanza y datos. Los casos distinguen código público, resúmenes de proyectos privados y verificaciones realizadas.</p>
          <div className="mt-7 grid sm:grid-cols-2 gap-4">
            {caseStudies.slice(0, 3).map((study) => (
              <Link key={study.slug} to={`/proyectos/${study.slug}`} className="rounded-xl border rule p-5 hover:border-rust-500 transition-colors">
                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">{evidence[study.slug]?.focus}</p>
                <h3 className="mt-2 font-serif text-xl flex items-center justify-between gap-3">{study.name}<ArrowUpRight size={18} aria-hidden="true" /></h3>
                <p className="mt-3 text-sm text-rust-600 dark:text-rust-400">{study.repo ? "Arquitectura y código público" : "Arquitectura, evidencia y límites"}</p>
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium">
            <a href={profile.cv} className="inline-flex items-center gap-2 text-rust-600 dark:text-rust-400"><FileText size={16} />Consultar CV</a>
            <a href="#experience">Revisar experiencia</a>
            <a href={`mailto:${profile.email}?subject=Oportunidad%20profesional%20en%20IA`}>Conversar sobre una oportunidad</a>
          </div>
        </div>
      </div>
    </section>
  );
}
