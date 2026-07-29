import { useState, useEffect } from "react";
import type { T } from "../i18n/translations";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function Countdown({ target, t }: { target: Date; t: T }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const items = [
    { label: t.days, value: pad(days) },
    { label: t.hours, value: pad(hours) },
    { label: t.minutes, value: pad(minutes) },
    { label: t.seconds, value: pad(seconds) },
  ];

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-end">
          <div className="flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-serif-elegant font-light text-gold-gradient tabular-nums leading-none">
              {item.value}
            </div>
            <div className="mt-2 text-[10px] md:text-xs tracking-[0.25em] uppercase text-gold-deep/70">
              {item.label}
            </div>
          </div>
          {i < items.length - 1 && (
            <span className="px-1 md:px-2 text-4xl md:text-5xl text-gold/50 leading-none -translate-y-2">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
