import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";
import { FallingPetals } from "./FallingPetals";
import { asset } from "../lib/assets";

export function Hero({ t, lang, visible, petalsVisible }: { t: T; lang: string; visible: boolean; petalsVisible?: boolean }) {
  const isAr = lang === "ar";

  return (
    <section className={`relative h-[100dvh] min-h-[640px] w-full overflow-hidden ${visible ? "curtains-open" : ""}`}>
      <img src={asset("/hero-bg.jpg")} alt="Venue" className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.9) brightness(1.02)" }} />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center top, transparent 30%, oklch(0.6 0.06 60 / 0.35) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/40" />
      <div className="absolute left-1/2 top-0 z-30 chandelier-sway">
        <img src={asset("/chandelier.png")} alt="" className="h-[34vh] w-auto max-w-[60vw] object-contain"
          style={{ filter: "drop-shadow(0 8px 16px oklch(0.4 0.1 60 / 0.4))" }} />
      </div>
      <img src={asset("/curtain.png")} alt="" className="curtain curtain-left" />
      <img src={asset("/curtain.png")} alt="" className="curtain curtain-right" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <div className={`fade-up ${visible ? "" : "opacity-0"}`}>
          <div className={`mb-4 text-[10px] tracking-[0.5em] text-gold-deep/80 ${isAr ? "font-arabic text-sm tracking-normal" : "uppercase"}`}>
            {t.withHonor}
          </div>
          <h1 className="font-script text-[clamp(3.5rem,14vw,7rem)] leading-[0.85] text-ink/85">
            Mousa
          </h1>
          <div className="my-1 font-serif-elegant text-2xl italic text-gold-deep">&</div>
          <h1 className="font-script text-[clamp(3.5rem,14vw,7rem)] leading-[0.85] text-ink/85">
            Shahd
          </h1>
          <OrnamentDivider className="mx-auto mt-6 h-6 w-44 text-gold-deep" />
          <div className={`mt-4 text-sm md:text-base text-ink/80 ${isAr ? "font-arabic" : "font-display"}`}>
            {t.date}
          </div>
          <div className={`mt-1 text-xs text-ink/60 ${isAr ? "font-arabic" : "italic"}`}>
            {t.time}
          </div>
        </div>
      </div>
      {petalsVisible && <FallingPetals count={26} />}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 fade-up">
        <div className="flex flex-col items-center gap-2 text-gold-deep/80">
          <span className={`text-[10px] ${isAr ? "font-arabic" : "tracking-[0.35em] uppercase"}`}>
            {t.scroll}
          </span>
          <span className="block h-8 w-px animate-pulse bg-gold-deep/60" />
        </div>
      </div>
    </section>
  );
}
