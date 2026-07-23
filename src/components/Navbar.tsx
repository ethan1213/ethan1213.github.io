import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#experience", label: "Experiencia" },
  { href: "#projects", label: "Proyectos" },
  { href: "#community", label: "Comunidad" },
  { href: "#contact", label: "Contacto" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-ink-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-ink-700"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-heading font-semibold text-lg tracking-tight">
          Ethan<span className="text-gradient">.</span>Astorga
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-ink-900 dark:hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="size-9 grid place-items-center rounded-full border border-zinc-200 dark:border-ink-700 text-zinc-600 dark:text-zinc-300 hover:border-cyan-glow/50 hover:text-cyan-glow transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
            className="md:hidden size-9 grid place-items-center rounded-full border border-zinc-200 dark:border-ink-700 text-zinc-600 dark:text-zinc-300"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 bg-white/95 dark:bg-ink-950/95 backdrop-blur-lg border-b border-zinc-200 dark:border-ink-700">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
