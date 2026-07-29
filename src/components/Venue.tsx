import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";
import { asset } from "../lib/assets";

export function Venue({ t, lang }: { t: T; lang: string }) {
  const isAr = lang === "ar";

  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className={`text-[10px] text-gold-deep/70 ${isAr ? "font-arabic text-sm" : "tracking-[0.5em] uppercase"}`}>
            {t.venueKicker}
          </div>
          <h2 className={`mt-2 text-5xl text-gold-deep ${isAr ? "font-calligraphy" : "font-script"}`}>
            {t.venueTitle}
          </h2>
          <OrnamentDivider className="mx-auto mt-3 h-5 w-40 text-gold-deep" />
        </div>
        <div className="relative mt-10 p-2">
          <div className="relative overflow-hidden border border-gold-deep/50">
            <div className="relative border border-gold/40">
              <img src={asset("/venue.jpg")} alt="Wedding venue" className="block h-[420px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0" style={{
                background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.55 0.08 65 / 0.28) 100%)"
              }} />
              <div className="pointer-events-none absolute inset-3 ring-1 ring-inset ring-cream/40" />
              {["tl", "tr", "bl", "br"].map((corner) => (
                <span
                  key={corner}
                  className={`pointer-events-none absolute h-6 w-6 border-gold ${
                    corner === "tl" ? "left-2 top-2 border-l border-t" :
                    corner === "tr" ? "right-2 top-2 border-r border-t" :
                    corner === "bl" ? "left-2 bottom-2 border-b border-l" :
                    "right-2 bottom-2 border-b border-r"
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent p-6 text-center">
                <div className="font-script text-3xl text-cream">{t.venueCaption}</div>
                <div className={`mt-1 text-[10px] text-cream/85 ${isAr ? "font-arabic text-sm" : "tracking-[0.4em] uppercase"}`}>
                  {t.venueTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-lg text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <OrnamentDivider className="h-3 w-8 text-gold-deep" />
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <p className={`mt-5 text-base leading-relaxed text-ink/80 ${isAr ? "font-arabic" : "font-serif-elegant italic"}`}>
            {t.venueDescription}
          </p>
          <div className={`mt-5 text-xs text-gold-deep/80 ${isAr ? "font-arabic text-sm" : "font-display tracking-[0.35em] uppercase"}`}>
            {t.venueCaption}
          </div>
        </div>
      </div>
    </section>
  );
}
