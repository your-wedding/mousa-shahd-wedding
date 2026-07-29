import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { asset } from "../lib/assets";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(asset("/wedding-music.mp3"));
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    async function tryPlay() {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        const handler = async () => {
          try {
            await audio.play();
            setPlaying(true);
          } catch {}
          window.removeEventListener("click", handler);
          window.removeEventListener("touchstart", handler);
        };
        window.addEventListener("click", handler, { once: true });
        window.addEventListener("touchstart", handler, { once: true });
      }
    }
    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-cream/85 text-gold-deep shadow-lg shadow-gold-deep/20 backdrop-blur-md transition hover:scale-105 hover:bg-cream"
    >
      {playing ? (
        <>
          <Volume2 className="h-5 w-5" />
          <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping" />
        </>
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}
