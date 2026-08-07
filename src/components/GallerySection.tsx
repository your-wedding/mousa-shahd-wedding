import { useState } from "react";
import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";
import { asset } from "../lib/assets";

const PHOTOS = [
  "hero-bg.jpg",
  "venue.jpg",
  "envelope-top.png",
  "chandelier.png",
];

export function GallerySection({ t, lang }: { t: T; lang: string }) {
  const isAr = lang === "ar";
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className={`text-[10px] text-gold-deep/70 ${isAr ? "font-arabic text-sm" : "tracking-[0.5em] uppercase"}`}>
            {t.galleryKicker}
          </div>
          <h2 className={`mt-2 text-5xl text-gold-deep ${isAr ? "font-calligraphy" : "font-script"}`}>
            {t.galleryTitle}
          </h2>
          <OrnamentDivider className="mx-auto mt-3 h-5 w-40 text-gold-deep" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
          {PHOTOS.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              className="group relative overflow-hidden border border-gold-deep/50 p-2"
              style={{
                gridColumn: i === 0 ? "span 2" : undefined,
              }}
            >
              <div className="relative overflow-hidden border border-gold/40">
                <img
                  src={asset(`/${src}`)}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="block w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ height: i === 0 ? "24rem" : "12rem" }}
                />
                <div className="pointer-events-none absolute inset-0" style={{
                  background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.55 0.08 65 / 0.25) 100%)"
                }} />
              </div>
            </button>
          ))}
        </div>

        {active !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-6"
            onClick={() => setActive(null)}
          >
            <img
              src={asset(`/${PHOTOS[active]}`)}
              alt={t.galleryTitle}
              className="max-h-full max-w-full rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}