import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCaseStudy } from "../data/caseStudies";
import { Reveal } from "../components/Reveal";
import { GithubIcon } from "../components/icons";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug ?? "");

  if (!study) return <Navigate to="/" replace />;

  return (
    <article className="pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Todos los proyectos
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-rust-600 dark:text-rust-400 mt-8 mb-3">
            {study.year}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{study.name}</h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">{study.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href={study.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-stone-900 dark:border-white pb-0.5 text-sm font-medium hover:text-rust-600 dark:hover:text-rust-400 hover:border-rust-600 dark:hover:border-rust-400 transition-colors"
            >
              <GithubIcon size={16} /> Ver repositorio <ArrowUpRight size={14} />
            </a>
            <div className="flex flex-wrap gap-x-3 text-xs font-mono text-stone-500">
              {study.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-14 space-y-5">
          {study.overview.map((p, i) => (
            <p key={i} className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <h2 className="font-serif italic text-2xl mb-6">Cómo está armado</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {study.architecture.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">{group.title}</p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-stone-700 dark:text-stone-300 flex gap-2">
                      <span className="text-rust-600 dark:text-rust-400 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2 className="font-serif italic text-2xl mb-6">Cómo funciona, paso a paso</h2>
          <ol className="space-y-5">
            {study.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm text-rust-600 dark:text-rust-400 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <h2 className="font-serif italic text-2xl mb-6">Estructura del repositorio</h2>
          <pre className="border rule p-5 overflow-x-auto text-xs font-mono text-stone-600 dark:text-stone-400 leading-relaxed">
            {study.structure}
          </pre>
        </Reveal>

        <Reveal delay={0.14} className="mt-14">
          <h2 className="font-serif italic text-2xl mb-6">Consideraciones</h2>
          <ul className="space-y-3">
            {study.considerations.map((c, i) => (
              <li key={i} className="text-sm text-stone-600 dark:text-stone-400 border-l-2 border-stone-300 dark:border-stone-700 pl-4">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="mt-16 pt-8 border-t rule">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Todos los proyectos
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
