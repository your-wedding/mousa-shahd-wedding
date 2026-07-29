import { useMemo } from "react";

const gradients: [string, string][] = [
  ["#c8505c", "#7a1f2b"],
  ["#d97384", "#8a2a36"],
  ["#e89aa3", "#a3414b"],
  ["#b8404a", "#5e1820"],
  ["#d4636e", "#7a2330"],
];

function PetalShape({ from, to, gid }: { from: string; to: string; gid: string }) {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <defs>
        <radialGradient id={gid} cx="35%" cy="35%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
      </defs>
      <path d="M20 4 C30 8, 36 18, 32 28 C28 36, 20 38, 20 38 C20 38, 12 36, 8 28 C4 18, 10 8, 20 4 Z" fill={`url(#${gid})`} opacity="0.92" />
      <path d="M20 6 C22 16, 22 26, 20 36" stroke="rgba(60,10,15,0.35)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

export function FallingPetals({ count = 28 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const [from, to] = gradients[i % gradients.length];
        const xStart = `${Math.random() * 100}vw`;
        const offset = (Math.random() - 0.5) * 30;
        const xEnd = `calc(${xStart} + ${offset}vw)`;
        const rStart = `${Math.random() * 360}deg`;
        const rEnd = `${Math.random() * 720 + 360}deg`;
        const duration = 7 + Math.random() * 7;
        const delay = -Math.random() * duration;
        const size = 14 + Math.random() * 18;
        return { from, to, xStart, xEnd, rStart, rEnd, duration, delay, size, id: i, gid: `petal-grad-${i}` };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            left: p.xStart,
            top: "-10vh",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            "--x-end": p.xEnd,
            "--r-start": p.rStart,
            "--r-end": p.rEnd,
          } as React.CSSProperties}
        >
          <PetalShape from={p.from} to={p.to} gid={p.gid} />
        </div>
      ))}
    </div>
  );
}
