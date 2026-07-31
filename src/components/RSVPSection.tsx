import { useState, useEffect } from "react";
import type { T } from "../i18n/translations";
import { OrnamentDivider } from "./OrnamentDivider";

interface RSVPItem {
  id?: string;
  name: string;
  status: "attending" | "not-attending";
  guests: number;
  createdAt?: string;
}

export function RSVPSection({ t, lang }: { t: T; lang: string }) {
  const isAr = lang === "ar";
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"attending" | "not-attending">("attending");
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPItem[]>([]);
  const [error, setError] = useState("");

  // Google Apps Script Web App URL
  const sheetUrl = "https://script.google.com/macros/s/AKfycbzHvOc67tjH-dR3tBPjlm2PpLVmk33y0TMokIV2pStAbQqf3GQhiRktHfNmtCpGa-BO/exec";

  // Fetch RSVPs from Google Sheet or LocalStorage
  const fetchRsvps = async () => {
    if (sheetUrl) {
      try {
        const res = await fetch(sheetUrl);
        const data = await res.json();
        if (Array.isArray(data)) {
          setRsvps(data.reverse()); // latest first
          return;
        }
      } catch (err) {
        console.warn("Failed to fetch from Google Sheet, falling back to local storage:", err);
      }
    }
    // Fallback to localStorage
    loadLocalRsvps();
  };

  useEffect(() => {
    fetchRsvps();
    const interval = setInterval(fetchRsvps, 10000); // Poll every 10s for live updates

    const channel = new BroadcastChannel("zoro_wedding_rsvp");
    channel.onmessage = () => {
      fetchRsvps();
    };

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, [sheetUrl]);

  function loadLocalRsvps() {
    try {
      const saved = localStorage.getItem("zoro_rsvps");
      if (saved) {
        setRsvps(JSON.parse(saved));
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    const newItem: RSVPItem = {
      name: name.trim(),
      status,
      guests: status === "attending" ? guests : 0,
      createdAt: new Date().toLocaleString(),
    };

    let savedSuccessfully = false;

    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        savedSuccessfully = true;
      } catch (err) {
        console.warn("Sheet POST failed, saving locally:", err);
      }
    }

    // Always save locally + BroadcastChannel as primary/backup
    try {
      const current = JSON.parse(localStorage.getItem("zoro_rsvps") || "[]");
      const updated = [{ ...newItem, id: Date.now().toString() }, ...current];
      localStorage.setItem("zoro_rsvps", JSON.stringify(updated));
      setRsvps(updated);
      const channel = new BroadcastChannel("zoro_wedding_rsvp");
      channel.postMessage("update");
      channel.close();
      savedSuccessfully = true;
    } catch {
      if (!savedSuccessfully) {
        setError("Could not save response. Please try again.");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSubmitted(true);
    // Refresh list
    setTimeout(fetchRsvps, 1500);
  };

  return (
    <section className="relative px-6 py-20 bg-[oklch(0.97_0.01_80)] border-t border-b border-gold/20">
      <div className="mx-auto w-full max-w-[520px]">
        <div className="bg-white/90 p-8 shadow-[0_20px_40px_-15px_oklch(0.35_0.07_60/0.2)] border border-gold-deep/40 text-center relative">

          <div className={`font-arabic text-xl font-bold text-gold-deep mb-2`}>
            {t.rsvpTitle}
          </div>
          <OrnamentDivider className="mx-auto my-4 h-4 w-28 text-gold-deep" />

          {submitted ? (
            <div className="py-8 animate-[fade-up_0.5s_ease-out]">
              <div className="text-4xl mb-3">✨</div>
              <p className="font-arabic text-lg text-ink/95 font-medium">
                {t.rsvpSuccess}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setGuests(1);
                }}
                className="mt-6 text-xs text-gold-deep underline hover:text-gold font-arabic"
              >
                {isAr ? "إرسال رد آخر" : "Submit another response"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-left" dir={isAr ? "rtl" : "ltr"}>
              <div>
                <label className="block font-arabic text-sm font-medium text-ink/80 mb-1.5">
                  {t.rsvpName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? "أدخل اسمك الكامل..." : "Enter your full name..."}
                  className="w-full rounded-md border border-gold-deep/30 bg-paper px-4 py-2.5 font-arabic text-sm text-ink focus:border-gold-deep focus:outline-none focus:ring-1 focus:ring-gold-deep"
                />
              </div>

              <div>
                <label className="block font-arabic text-sm font-medium text-ink/80 mb-2">
                  {isAr ? "حالة الحضور" : "Attendance Status"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("attending")}
                    className={`py-2.5 px-4 rounded-md font-arabic text-sm transition-all border ${
                      status === "attending"
                        ? "bg-gold-deep text-white border-gold-deep shadow-md"
                        : "bg-paper text-ink/80 border-gold-deep/30 hover:bg-gold-deep/10"
                    }`}
                  >
                    {t.rsvpAttending}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("not-attending")}
                    className={`py-2.5 px-4 rounded-md font-arabic text-sm transition-all border ${
                      status === "not-attending"
                        ? "bg-stone-600 text-white border-stone-600 shadow-md"
                        : "bg-paper text-ink/80 border-gold-deep/30 hover:bg-stone-100"
                    }`}
                  >
                    {t.rsvpNotAttending}
                  </button>
                </div>
              </div>

              {status === "attending" && (
                <div className="animate-[fade-up_0.3s_ease-out]">
                  <label className="block font-arabic text-sm font-medium text-ink/80 mb-1.5">
                    {t.rsvpGuests}
                  </label>
                  <div className="flex items-center justify-between rounded-md border border-gold-deep/30 bg-paper px-4 py-2">
                    <span className="font-arabic text-sm text-ink/85">
                      {guests} {t.guestsCount}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-deep/40 bg-white font-bold text-gold-deep hover:bg-gold-deep/10"
                      >
                        -
                      </button>
                      <span className="font-medium text-ink w-4 text-center">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-deep/40 bg-white font-bold text-gold-deep hover:bg-gold-deep/10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-600 font-arabic">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gold-deep py-3 font-arabic text-sm font-medium text-white shadow-md transition-all hover:bg-gold-deep/90 disabled:opacity-50"
              >
                {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : t.rsvpSubmit}
              </button>
            </form>
          )}

          {/* Live Responses List */}
          {rsvps.length > 0 && (
            <div className="mt-10 border-t border-gold/30 pt-6 text-left" dir={isAr ? "rtl" : "ltr"}>
              <h3 className="font-arabic text-sm font-bold text-gold-deep mb-3 text-center">
                {t.rsvpListTitle} ({rsvps.length})
              </h3>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {rsvps.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center justify-between rounded bg-paper p-2.5 text-xs border border-gold/20"
                  >
                    <span className="font-arabic font-medium text-ink/90">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 font-arabic text-[10px] ${
                          item.status === "attending"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {item.status === "attending" ? (isAr ? "سيحضر" : "Attending") : (isAr ? "اعتذر" : "Can't make it")}
                      </span>
                      {item.status === "attending" && item.guests > 0 && (
                        <span className="font-arabic text-ink/60">
                          ({item.guests} {t.guestsCount})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
