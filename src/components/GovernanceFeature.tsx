import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GovernanceComparison } from "./GovernanceComparison";

export function GovernanceFeature() {
  return <section id="governance" className="py-16 border-t rule governance-surface">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8 items-end"><div><p className="eyebrow-label">Trabajo destacado · Gobernanza de IA y datos</p><h2 className="font-serif text-3xl md:text-4xl mt-4 tracking-tight">Privacidad en el flujo.<br />Controles bajo prueba.</h2></div><p className="text-stone-600 dark:text-stone-400 leading-7">Esta línea reúne dos proyectos complementarios: proteger la información antes de consultarla y comprobar cómo responde un sistema ante casos que ponen a prueba sus controles.</p></div>
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6 mt-8 items-start">
        <div><GovernanceComparison /><Link to="/proyectos/ai-governance-testkit" className="action-secondary">Ver el caso del Testkit<ArrowUpRight size={16} /></Link></div>
        <div className="evidence-panel p-6 md:p-8 my-10"><p className="eyebrow-label">AI Privacy Gateway · v0.1</p><h3 className="font-serif text-2xl mt-3">La consulta empieza con un documento protegido.</h3><ol className="mt-6 space-y-4">{["Importar PDF o DOCX", "Revisar los datos detectados", "Seudonimizar el contenido", "Consultar el texto protegido", "Exportar con trazabilidad"].map((step,index)=><li key={step} className="flex gap-3 text-sm items-center"><span className="size-7 shrink-0 rounded-full border rule flex items-center justify-center font-mono text-xs text-rust-600 dark:text-rust-400">{index+1}</span>{step}</li>)}</ol><p className="mt-6 text-xs leading-6 text-stone-500 dark:text-stone-400">Flujo local con consulta extractiva, sin LLM en esta versión. 143 pruebas locales aprobadas e interfaz compilada; detección sobre corpus real e instalador de distribución pendientes.</p><Link to="/proyectos/ai-privacy-gateway" className="inline-flex gap-2 items-center mt-6 text-sm font-medium text-rust-600 dark:text-rust-400">Examinar privacidad y límites<ArrowUpRight size={16} /></Link></div>
      </div>
    </div>
  </section>;
}
