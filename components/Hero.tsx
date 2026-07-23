/** HERO CINEMATIC Diva Mabruro — Server Component: H1 & CTA tampil tanpa menunggu JS. */
import DivaEmblem from "@/components/DivaEmblem";
import { BadgeCheck } from "lucide-react";
import WaLink from "@/components/WaLink";
import TrackLink from "@/components/TrackLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const TRUST = [
  "Pembayaran melalui rekening resmi perusahaan",
  "Pendampingan dari konsultasi hingga keberangkatan",
  "Skema dijelaskan secara transparan",
  "Pelayanan nyaman untuk jamaah dan orang tua",
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[radial-gradient(100%_80%_at_88%_-8%,#F6C9CE_0%,#FDE3E6_30%,#FFF4EC_62%,#FFF8F2_100%)]">
      <div aria-hidden className="deco pat-star inset-0 [mask-image:radial-gradient(70%_60%_at_75%_20%,#000,transparent)]" />
      <div className="shell grid items-center gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:pb-20 lg:pt-16">
        {/* Copy */}
        <div>
          <p className="fx fx-up pill-soft" style={{ "--d": "0s" } as React.CSSProperties}>Diva Mabruro — Haji Khusus</p>

          <h1 className="h-display fx fx-up mt-4 text-[2.45rem] sm:text-5xl xl:text-[3.6rem]" style={{ "--d": ".08s" } as React.CSSProperties}>
            <strong className="grad-text font-bold">Haji Khusus</strong> <em className="font-display">Ala Sultan,</em>
            <br />Mulai <strong className="font-bold text-red">Rp1,2 Juta</strong> per Bulan
          </h1>

          <p className="fx fx-up mt-3 inline-flex rounded-full border border-red/30 bg-white px-4 py-1.5 text-[13px] font-bold text-red" style={{ "--d": ".16s" } as React.CSSProperties}>
            “Haji Ala Sultan Gak Harus Mahal”
          </p>

          <p className="fx fx-up mt-4 max-w-xl text-[17px] leading-relaxed text-ink-2" style={{ "--d": ".22s" } as React.CSSProperties}>
            Amankan porsi Haji Khusus lewat skema setoran yang transparan — mulai dari setoran awal
            <strong className="text-ink"> USD 1.000</strong>, sisanya dapat dicicil sesuai kemampuan.
          </p>

          <div className="fx fx-up mt-6 flex flex-col gap-3 sm:flex-row" style={{ "--d": ".32s" } as React.CSSProperties}>
            <TrackLink href="#simulasi" event="hero_cta_click" data={{ placement: "hero", cta: "simulasi" }} className="btn btn-red w-full sm:w-auto">
              Hitung Cicilan Porsi <span className="arr" aria-hidden>→</span>
            </TrackLink>
            <WaLink message={buildGeneralMessage("hero")} event="hero_cta_click" data={{ placement: "hero", cta: "whatsapp" }} className="btn btn-outline w-full sm:w-auto">
              Konsultasi Gratis
            </WaLink>
          </div>

          <p className="fx fx-up mt-4 max-w-xl border-l-[3px] border-red/50 bg-white/70 py-1 pl-3 text-[12px] leading-relaxed text-ink-2" style={{ "--d": ".38s" } as React.CSSProperties}>
            Rp1,2 juta/bulan = simulasi cicilan sisa DP USD 4.000 selama 60 bulan (kurs Rp18.000/USD) —
            bukan harga keseluruhan perjalanan Haji.
          </p>

          <ul className="fx fx-up mt-6 grid max-w-xl gap-x-6 gap-y-2.5 sm:grid-cols-2" style={{ "--d": ".44s" } as React.CSSProperties}>
            {TRUST.map((t) => (
              <li key={t} className="flex items-start gap-2 text-[13.5px] font-semibold text-ink">
                <BadgeCheck size={17} aria-hidden className="mt-0.5 shrink-0 text-red" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Emblem logo Diva bergerak + panel angka */}
        <div className="fx fx-in group relative mx-auto w-full max-w-[250px] sm:max-w-[340px] lg:max-w-[400px]" style={{ "--d": ".18s" } as React.CSSProperties}>
          <svg aria-hidden viewBox="0 0 120 120" fill="none" className="absolute -left-8 -top-8 z-10 h-24 w-24 text-red">
            <path d="M14 98 C 8 46, 44 12, 102 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="wing-path" />
            <path d="M32 98 C 29 62, 56 33, 98 29" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="wing-path" style={{ animationDelay: ".6s" }} />
          </svg>
          <div aria-hidden className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-t-[9rem] rounded-b-[2rem] bg-[linear-gradient(160deg,#FAD9DD,#FFF4EC)] sm:block" />
          <span aria-hidden className="tint-blob -left-10 top-1/3 h-40 w-40 bg-gold/25" />
          <DivaEmblem priority />
          <div className="relative -mt-10 ml-auto mr-3 w-fit max-w-full sm:absolute sm:-bottom-7 sm:-left-6 sm:m-0">
            <div className="card grid gap-1.5 rounded-2xl p-4 shadow-card">
              <p className="text-[12px] font-bold uppercase tracking-wide text-ink-2">DP Porsi Haji Khusus</p>
              <p className="text-sm font-bold text-ink">Setoran awal <span className="text-red">USD 1.000</span> · Total DP <span className="text-red">USD 5.000</span></p>
              <p className="text-[12px] text-ink-2">Biaya perjalanan dihitung terpisah.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
