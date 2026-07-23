import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t rule py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-stone-500">
        <p>© {new Date().getFullYear()} {profile.fullName}.</p>
        <p className="font-mono text-xs">React, TypeScript & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
