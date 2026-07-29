import { OrnamentDivider } from "./OrnamentDivider";
import type { T } from "../i18n/translations";

export function MapSection({ t, lang }: { t: T; lang: string }) {
  const isAr = lang === "ar";

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className={`text-4xl text-gold-deep ${isAr ? "font-calligraphy" : "font-script"}`}>
          {t.directionsTitle}
        </h2>
        <OrnamentDivider className="mx-auto mt-3 h-5 w-40 text-gold-deep" />
        <div className="mt-6 overflow-hidden rounded-sm border border-gold/30 shadow-xl shadow-gold-deep/10">
          <iframe
            title="Wedding venue location"
            src="https://www.google.com/maps?q=31.9606234,35.8801702&output=embed"
            className="h-72 w-full"
            loading="lazy"
          />
        </div>
        <a
          href="https://www.google.com/maps/place/%D9%81%D9%86%D8%AF%D9%82+%D8%B4%D9%8A%D8%B1%D8%A7%D8%AA%D9%88%D9%86+%D8%B9%D9%85%D8%A7%D9%86%E2%80%AD/@31.9601207,35.8778002,15.25z/data=!4m9!3m8!1s0x1504a948e643cb09:0x185af7c4d5a2737b!5m2!4m1!1i2!8m2!3d31.9606234!4d35.8801702!16s%2Fg%2F121_bwht!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className={`mt-6 inline-block border-b border-gold-deep/40 pb-1 text-xs text-gold-deep hover:text-ink transition ${isAr ? "font-arabic text-sm" : "font-display tracking-[0.3em] uppercase"}`}
        >
          {t.openInMaps}
        </a>
      </div>
    </section>
  );
}
