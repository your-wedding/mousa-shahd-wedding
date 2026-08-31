import { useState, useEffect } from "react";
import { translations, type Lang } from "./i18n/translations";
import { Envelope } from "./components/Envelope";
import { Hero } from "./components/Hero";
import { Bismillah } from "./components/Bismillah";
import { SaveDate } from "./components/SaveDate";
import { Timeline } from "./components/Timeline";
import { Venue } from "./components/Venue";
import { MapSection } from "./components/MapSection";
import { RSVPSection } from "./components/RSVPSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { LanguageToggle } from "./components/LanguageToggle";
import { OrnamentDivider } from "./components/OrnamentDivider";

const WEDDING_DATE = new Date("2026-08-21T15:30:00Z");

function MainContent() {
  const [lang, setLang] = useState<Lang>("ar");
  const [heroVisible, setHeroVisible] = useState(false);
  const [petalsVisible, setPetalsVisible] = useState(false);
  const t = translations[lang];
  const isAr = lang === "ar";

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 1400);
    const t2 = setTimeout(() => setPetalsVisible(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main className="relative w-full bg-paper" dir={isAr ? "rtl" : "ltr"}>
      <LanguageToggle lang={lang} onToggle={() => setLang(isAr ? "en" : "ar")} />

      <Hero t={t} lang={lang} visible={heroVisible} petalsVisible={petalsVisible} />

      <Bismillah t={t} />

      <SaveDate t={t} lang={lang} target={WEDDING_DATE} />

      <Timeline t={t} lang={lang} />

      <Venue t={t} lang={lang} />

      <MapSection t={t} lang={lang} />

      <RSVPSection t={t} lang={lang} />

      <footer className="relative px-6 py-20 text-center">
        <OrnamentDivider className="mx-auto h-6 w-48 text-gold-deep" />
        <p className={`mt-6 text-3xl text-gold-deep ${isAr ? "font-calligraphy" : "font-script"}`}>
          {t.footer}
        </p>
        <div className="mt-6 text-xs tracking-[0.4em] uppercase text-ink/50">
          {t.groomName.toUpperCase()} &amp; {t.brideName.toUpperCase()} · 21.08.2026
        </div>
      </footer>

      <MusicPlayer />
    </main>
  );
}

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false);

  if (!invitationOpen) {
    return <Envelope onOpen={() => setInvitationOpen(true)} t={translations["en"]} />;
  }

  return (
    <div className="animate-[fade-up_0.9s_ease-out]">
      <MainContent />
    </div>
  );
}

export default App;
