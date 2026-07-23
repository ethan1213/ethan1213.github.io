import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, ArrowLeft } from "lucide-react";
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
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 border-b ${
        scrolled ? "bg-stone-50/95 dark:bg-stone-950/95 rule" : "bg-stone-50/95 dark:bg-stone-950/95 border-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif italic text-lg tracking-tight">
          Ethan Astorga
        </Link>

        {isHome ? (
          <ul className="hidden md:flex items-center gap-8 text-sm text-stone-600 dark:text-stone-400">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="size-9 grid place-items-center rounded-full border rule text-stone-600 dark:text-stone-300 hover:border-rust-500 hover:text-rust-500 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {isHome && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Abrir menú"
              className="md:hidden size-9 grid place-items-center rounded-full border rule text-stone-600 dark:text-stone-300"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </nav>

      {isHome && open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 bg-stone-50 dark:bg-stone-950 border-b rule">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-stone-600 dark:text-stone-300"
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
