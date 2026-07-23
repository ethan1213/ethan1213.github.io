import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-ink-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} {profile.fullName}.</p>
        <p className="font-mono text-xs">Construido con React, TypeScript & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
