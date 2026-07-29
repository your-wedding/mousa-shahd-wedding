export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 20 H80" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path d="M120 20 H190" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path d="M100 6 C 108 12, 108 28, 100 34 C 92 28, 92 12, 100 6 Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08" />
      <circle cx="100" cy="20" r="2" fill="currentColor" />
      <circle cx="85" cy="20" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="115" cy="20" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
