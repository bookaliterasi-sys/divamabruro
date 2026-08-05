"use client";
/** KALKULATOR USIA KEBERANGKATAN — mengubah angka antrean jadi gambaran diri sendiri. */
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import { TUNGGU_KHUSUS_MAX, TUNGGU_KHUSUS_MIN, TUNGGU_REGULER_MAX, TUNGGU_REGULER_MIN } from "@/lib/antrean";
import { track } from "@/lib/analytics";

export default function AgeCalculator() {
  const [usiaRaw, setUsiaRaw] = useState("40");
  const started = useState({ v: false })[0];
  const usia = Math.min(75, Math.max(12, Number(usiaRaw) || 40));

  const onChange = (v: string) => {
    if (!started.v) { started.v = true; track("age_calculator_used", {}); }
    setUsiaRaw(v);
  };

  const waMsg =
    `Assalamu'alaikum, saya dari website Diva Mabruro. Usia saya ${usia} tahun. ` +
    `Saya ingin tahu perkiraan keberangkatan Haji Khusus dan skema porsinya. Mohon dibantu.`;

  const CARDS = [
    { label: "Haji Reguler", sub: "Jalur umum", from: usia + TUNGGU_REGULER_MIN, to: usia + TUNGGU_REGULER_MAX, tone: "plain" as const },
    { label: "Haji Khusus — Diva", sub: "Kuota khusus", from: usia + TUNGGU_KHUSUS_MIN, to: usia + TUNGGU_KHUSUS_MAX, tone: "red" as const },
  ];

  return (
    <div className="card overflow-hidden !rounded-[28px] p-6 shadow-card sm:p-8">
      <label htmlFor="usia" className="block text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">
        Usia Anda saat ini
      </label>
      <div className="input-group mt-2 max-w-[240px]">
        <input
          id="usia"
          type="number"
          inputMode="numeric"
          min={12}
          max={75}
          value={usiaRaw}
          onChange={(e) => onChange(e.target.value)}
          className="h-[52px] w-full min-w-0 pl-4 text-[16px] font-bold text-ink"
        />
        <span className="pr-4 text-[13px] font-bold text-ink-2" aria-hidden>tahun</span>
      </div>

      <p className="mt-6 text-[15px] font-semibold text-ink">Perkiraan usia Anda saat berangkat:</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {CARDS.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl p-5 transition-colors ${c.tone === "red" ? "bg-[linear-gradient(150deg,#C4161F,#8E1016)] text-white shadow-soft" : "border border-line bg-off text-ink"}`}
          >
            <p className={`text-[12px] font-bold uppercase tracking-[0.14em] ${c.tone === "red" ? "text-white/80" : "text-ink-2"}`}>{c.label}</p>
            <p className="mt-1.5 font-display text-4xl font-bold leading-none tabular-nums sm:text-5xl" aria-live="polite">
              ±{c.from}–{c.to}
              <span className="ml-1.5 text-base font-bold">tahun</span>
            </p>
            <p className={`mt-1.5 text-[12px] ${c.tone === "red" ? "text-white/75" : "text-ink-2"}`}>{c.sub}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-ink-2">
        Estimasi mengikuti masa tunggu Haji Khusus 5–9 tahun dan Haji Reguler ±25–40 tahun (bervariasi per provinsi).
        Angka aktual mengikuti nomor porsi, kuota, dan kebijakan tahun berjalan.
      </p>

      <WaLink message={waMsg} event="age_calculator_whatsapp_click" data={{ usia }} className="btn btn-red mt-5 w-full sm:w-auto">
        <MessageCircle size={16} aria-hidden /> Konsultasikan Usia Saya
      </WaLink>
    </div>
  );
}
