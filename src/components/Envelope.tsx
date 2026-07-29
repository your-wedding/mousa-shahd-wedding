import { useState } from "react";
import type { T } from "../i18n/translations";
import { asset } from "../lib/assets";

export function Envelope({ onOpen, t }: { onOpen: () => void; t: T }) {
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    if (!opened) {
      setOpened(true);
      setTimeout(onOpen, 2000);
    }
  }

  return (
    <div className="env-stage">
      <div className="env-bg" aria-hidden />
      <div className="env-back" aria-hidden />
      <div className={`env-flap ${opened ? "is-open" : ""}`} aria-hidden>
        <div className="env-flap-shape" />
        <img src={asset("/envelope-top.png")} alt="" className="env-flap-ornament" draggable={false} />
      </div>
      <button
        type="button"
        onClick={handleOpen}
        className={`env-seal ${opened ? "is-open" : ""}`}
        aria-label="Open invitation"
      >
        <span className="env-seal-halo" aria-hidden />
        <img src={asset("/flap-ornament.png")} alt="" className="env-seal-img" draggable={false} />
      </button>
      <div className={`env-hint ${opened ? "is-open" : ""}`}>
        <div className="env-hint-text font-serif-elegant">{t.tapToOpen}</div>
        <svg className="env-hint-divider" viewBox="0 0 240 14" fill="none" aria-hidden>
          <line x1="10" y1="7" x2="100" y2="7" stroke="currentColor" strokeWidth="0.6" />
          <line x1="140" y1="7" x2="230" y2="7" stroke="currentColor" strokeWidth="0.6" />
          <g transform="translate(120 7)" stroke="currentColor" strokeWidth="0.8" fill="none">
            <path d="M-10 0 L0 -6 L10 0 L0 6 Z" />
            <circle cx="0" cy="0" r="1.4" fill="currentColor" />
            <path d="M-14 0 L-10 0 M10 0 L14 0" />
          </g>
        </svg>
      </div>

      <style>{`
        .env-stage {
          perspective: 2200px;
          isolation: isolate;
          background: radial-gradient(at 50% 35%, #fff8eb, #f6e9d7 55%, #eddbc5);
          width: 100%;
          min-height: 100dvh;
          position: relative;
          overflow: hidden;
        }
        .env-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(200,160,74,0.06) 0%, transparent 60%);
        }
        .env-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(44,36,22,0.03) 100%);
        }
        .env-flap {
          position: absolute;
          left: 0;
          right: 0;
          height: 54%;
          backface-visibility: hidden;
        }
        .env-flap.is-open {
          transform: rotateX(180deg);
        }
        .env-flap-shape {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          filter: drop-shadow(0 8px 22px #51321738);
          filter: drop-shadow(0 8px 22px lab(24.3765% 12.1905 22.7612 / .22));
          background: linear-gradient(#fff9f1, #f9efdf 60%, #eedbc3);
          background: linear-gradient(#fff9f1, #f9efdf 60%, #eedbc3);
          position: absolute;
          inset: 0;
        }
        .env-flap-ornament {
          object-fit: fill;
          pointer-events: none;
          opacity: .92;
          filter: drop-shadow(0 1px #ffffffe6) drop-shadow(0 -1px #a5896f38);
          filter: drop-shadow(0 1px lab(100% 0 0 / .9)) drop-shadow(0 -1px lab(59.3228% 7.95403 18.1071 / .22));
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          mix-blend-mode: multiply;
          width: 100%;
          height: 96%;
          position: absolute;
          top: 4%;
          left: 50%;
          transform: translate(-50%);
        }
        .env-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease;
        }
        .env-seal:hover {
          transform: translate(-50%, -50%) scale(1.05);
        }
        .env-seal.is-open {
          transform: translate(-50%, -50%) scale(0.3) translateY(-120px);
          opacity: 0;
          pointer-events: none;
        }
        .env-seal-halo {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,160,74,0.2) 0%, transparent 70%);
          animation: ping-slow 3s ease-in-out infinite;
        }
        .env-seal-img {
          width: 120px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(90,40,30,0.3));
        }
        .env-hint {
          position: absolute;
          top: 58%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #9a7b3a;
          transition: opacity 0.6s ease;
        }
        .env-hint.is-open {
          opacity: 0;
        }
        .env-hint-text {
          font-size: 18px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .env-hint-divider {
          width: 120px;
          height: 14px;
        }
      `}</style>
    </div>
  );
}
