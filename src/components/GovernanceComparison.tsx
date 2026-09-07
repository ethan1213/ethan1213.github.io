import { governanceRun } from "../data/governanceRun";

export function GovernanceComparison() {
  return <section aria-labelledby="comparison-title" className="evidence-panel my-10 p-6 md:p-8">
    <p className="eyebrow-label">Ejecución local · {governanceRun.date}</p>
    <h2 id="comparison-title" className="font-serif text-2xl mt-3">Mismas pruebas. Distintas defensas.</h2>
    <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">176 pruebas por perfil, sobre un sistema de demostración determinista y datos sintéticos. Los fallos del contraste son intencionales.</p>
    <div className="mt-7 space-y-5">{governanceRun.profiles.map((profile) => <div key={profile.name}>
      <div className="flex justify-between gap-4 text-sm mb-2"><span>{profile.name}</span><span className="font-mono">{profile.failed} fallos · {profile.passed} pasan</span></div>
      <div className="h-3 rounded-full overflow-hidden bg-emerald-600/20" role="img" aria-label={`${profile.name}: ${profile.failed} fallos de ${profile.total} pruebas`}><div className="h-full bg-rust-500 rounded-full" style={{width: `${profile.failed / profile.total * 100}%`}} /></div>
    </div>)}</div>
    <p className="mt-5 text-xs leading-6 text-stone-500 dark:text-stone-400">Longitud de color: proporción de pruebas fallidas. Cero fallos aplica a este corpus; no garantiza seguridad en producción.</p>
    <a href="/evidence/governance-comparison.json" className="mt-4 inline-flex text-sm font-medium text-rust-600 dark:text-rust-400 underline underline-offset-4">Consultar resultados y método</a>
  </section>;
}
