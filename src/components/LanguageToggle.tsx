import type { Lang } from "../i18n/translations";

export function LanguageToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-4 top-4 z-50 border border-gold-deep/60 bg-cream/85 px-3 py-2 font-display text-[11px] tracking-[0.3em] uppercase text-gold-deep shadow-lg backdrop-blur transition hover:bg-gold-deep hover:text-cream"
    >
      {lang === "en" ? "ع" : "EN"}
    </button>
  );
}
