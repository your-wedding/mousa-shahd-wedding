import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";

export function Bismillah({ t }: { t: T }) {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto w-full max-w-[520px] bg-[oklch(0.985_0.012_80)] p-2 shadow-[0_30px_60px_-20px_oklch(0.35_0.07_60/0.35)]"
        style={{
          backgroundImage: "radial-gradient(ellipse at 10% 50%, oklch(0.78 0.06 70 / 0.12), transparent 35%), radial-gradient(ellipse at 90% 50%, oklch(0.78 0.06 70 / 0.12), transparent 35%)"
        }}
      >
        <div className="relative border border-gold-deep/60 p-[10px]">
          <div className="border border-gold/40 px-7 py-12 text-center" dir="rtl">
            <div className="font-calligraphy text-2xl leading-tight text-gold-deep">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <p className="mt-5 font-arabic text-[15px] leading-[2.1] text-ink/85">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>
            <div className="my-7 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-l from-transparent via-gold to-transparent" />
              <OrnamentDivider className="h-3 w-8 text-gold-deep" />
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
            <div className="font-arabic text-base text-ink/80">
              بكل حب ومودة يتشرف
            </div>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <div className="text-xs text-gold-deep/80 font-arabic">{t.groomFatherTitle}</div>
                  <div className="mt-2 font-arabic text-base leading-[1.8] text-ink/90 break-words">{t.groomFather}</div>
                </div>
                <div className="font-script text-3xl text-gold-deep">&</div>
                <div>
                  <div className="text-xs text-gold-deep/80 font-arabic">{t.brideFatherTitle}</div>
                  <div className="mt-2 font-arabic text-base leading-[1.8] text-ink/90 break-words">{t.brideFather}</div>
                </div>
              </div>
            </div>
            <div className="mt-7 font-arabic text-base text-ink/80">
              بدعوتكم لحضور حفل زفاف
            </div>
            <div className="mt-4 flex items-start justify-center gap-4 overflow-visible py-2">
              <div className="flex flex-col items-center">
                <span className="font-arabic text-xs text-gold-deep/80 mb-1">{t.groomTitle}</span>
                <span className="font-calligraphy text-[clamp(2.8rem,11vw,4.5rem)] leading-[1.4] text-gold-gradient pb-2">
                  {t.groomName}
                </span>
              </div>
              <span className="font-calligraphy text-2xl text-gold-deep self-center pt-6">و</span>
              <div className="flex flex-col items-center">
                <span className="font-arabic text-xs text-gold-deep/80 mb-1">{t.brideTitle}</span>
                <span className="font-calligraphy text-[clamp(2.8rem,11vw,4.5rem)] leading-[1.4] text-gold-gradient pb-2">
                  {t.brideName}
                </span>
              </div>
            </div>
            <div className="mt-3 font-display text-[11px] tracking-[0.4em] text-gold-deep/80" dir="ltr">
              {t.groomName.toUpperCase()} &amp; {t.brideName.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
