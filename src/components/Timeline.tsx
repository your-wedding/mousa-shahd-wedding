import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";

export function Timeline({ t, lang }: { t: T; lang: string }) {
  const isAr = lang === "ar";

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h2 className={`text-4xl text-gold-deep ${isAr ? "font-calligraphy" : "font-script"}`}>
            {t.timelineTitle}
          </h2>
          <OrnamentDivider className="mx-auto mt-3 h-5 w-40 text-gold-deep" />
        </div>
        <ol className="relative mt-12 pl-2" dir="ltr">
          <div className="absolute left-[88px] top-2 bottom-2 w-px bg-gold/40" />
          {t.timeline.map((item) => (
            <li key={item.time} className="relative grid grid-cols-[70px_24px_1fr] items-center gap-3 py-5">
              <span className="text-right font-serif-elegant text-2xl font-light text-ink/85 tabular-nums">
                {item.time}
              </span>
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-gold/60" />
                <span className="h-2 w-2 rounded-full bg-gold-deep" />
              </span>
              <div dir={isAr ? "rtl" : "ltr"}>
                <div className={`text-sm text-ink/85 ${isAr ? "font-arabic" : "font-display tracking-[0.18em]"}`}>
                  {item.title}
                </div>
                {item.note && (
                  <div className={`mt-0.5 text-xs text-ink/55 ${isAr ? "font-arabic" : "italic"}`}>
                    {item.note}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
