"use client";
/** SIMULATOR PORSI HAJI KHUSUS — pusat konversi. Hitung lokal, ringan, mobile-first. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildSimulationMessage } from "@/lib/whatsapp";
import { rupiah } from "@/lib/wa";
import { KURS_DEFAULT, TENORS, TENOR_DEFAULT, SETORAN_AWAL_USD, SISA_DP_USD, TOTAL_DP_USD, cicilanBulanan, setoranAwalRupiah, sisaDpRupiah, totalDpRupiah } from "@/lib/simulasi";
import { track } from "@/lib/analytics";

/** Angka bertransisi halus (rAF tween ±280ms, tanpa library). */
function Num({ v }: { v: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(v);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = prev.current;
    prev.current = v;
    if (from === v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = Math.round(v).toLocaleString("id-ID");
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 280);
      const val = from + (v - from) * (1 - Math.pow(1 - p, 3));
      el.textContent = Math.round(val).toLocaleString("id-ID");
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [v]);
  return <span ref={ref}>{Math.round(v).toLocaleString("id-ID")}</span>;
}

export default function Simulator() {
  const [kursRaw, setKursRaw] = useState(String(KURS_DEFAULT));
  const [ti, setTi] = useState(TENORS.indexOf(TENOR_DEFAULT));
  const started = useRef(false);

  const kurs = Math.min(30000, Math.max(10000, Number(kursRaw) || KURS_DEFAULT));
  const tenor = TENORS[ti];
  const monthly = cicilanBulanan(kurs, tenor);

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track("simulation_started", {});
    }
  };

  return (
    <section id="simulasi" className="blend relative overflow-hidden bg-[linear-gradient(180deg,#FFF8F2_0%,#FDE3E6_50%,#F6C9CE_100%)] pb-16 pt-8 sm:pb-24 sm:pt-12" style={{ "--blend-top": "#FFF8F2", "--blend-bottom": "#F6C9CE" } as React.CSSProperties}>
      <div aria-hidden className="tint-blob -left-28 top-6 h-80 w-80 bg-rose/25" />
      <div aria-hidden className="tint-blob -right-24 bottom-10 h-72 w-72 bg-gold/20" />
      <div aria-hidden className="deco pat-dots inset-y-0 right-0 w-1/3 [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      <div className="shell relative">
        <p className="kicker">Simulasi Pembayaran</p>
        <h2 data-fx className="h-display mt-3 max-w-2xl text-3xl sm:text-4xl">Hitung cicilan porsi Haji Khusus Anda</h2>
        <p className="mt-3 max-w-2xl text-[15px] text-ink-2">
          Coba pilih tenor yang sesuai dengan rencana keuangan Anda. Rumus: <strong className="text-ink">cicilan = (USD {SISA_DP_USD.toLocaleString("en-US")} × kurs) ÷ tenor</strong>.
        </p>

        <div data-fx className="card mt-8 overflow-hidden lg:grid lg:grid-cols-[1fr_.95fr]">
          {/* Kontrol */}
          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <label htmlFor="kurs" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">
                Kurs simulasi (Rp per USD)
              </label>
              <div className="input-group">
                <span className="pl-4 pr-1.5 text-[15px] font-bold text-ink-2" aria-hidden>Rp</span>
                <input
                  id="kurs"
                  type="number"
                  inputMode="numeric"
                  min={10000}
                  max={30000}
                  step={100}
                  value={kursRaw}
                  onFocus={onStart}
                  onChange={(e) => { onStart(); setKursRaw(e.target.value); }}
                  className="h-[52px] w-full min-w-0 text-[16px] font-bold text-ink"
                  aria-describedby="kurs-note"
                />
                <span className="pr-4 text-[13px] font-bold text-ink-2" aria-hidden>/ USD</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">Tenor cicilan (bulan)</p>
              <div className="tabs" style={{ "--n": TENORS.length, "--i": ti } as CSSProperties} role="tablist" aria-label="Pilihan tenor dalam bulan">
                <span aria-hidden className="ind" />
                {TENORS.map((t, i) => (
                  <button key={t} role="tab" aria-selected={ti === i} data-on={ti === i} aria-label={`${t} bulan`}
                    onClick={() => { onStart(); setTi(i); track("simulation_tenor_selected", { tenor: t }); }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <dl className="space-y-2 rounded-2xl bg-[linear-gradient(150deg,#FFF4EC,#FDEEF0)] p-4 text-[14.5px]">
              <div className="flex justify-between"><dt className="text-ink-2">Total DP (USD {TOTAL_DP_USD.toLocaleString("en-US")})</dt><dd className="font-bold text-ink">{rupiah(totalDpRupiah(kurs))}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-2">Setoran awal (USD {SETORAN_AWAL_USD.toLocaleString("en-US")})</dt><dd className="font-bold text-ink">{rupiah(setoranAwalRupiah(kurs))}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-2">Sisa DP (USD {SISA_DP_USD.toLocaleString("en-US")})</dt><dd className="font-bold text-ink">{rupiah(sisaDpRupiah(kurs))}</dd></div>
            </dl>

            <p id="kurs-note" className="rounded-xl border border-line bg-white p-3 text-[12px] leading-relaxed text-ink-2">
              Kurs Rp18.000 per USD hanya digunakan untuk simulasi. Kurs pembayaran dan nilai program aktual
              mengikuti ketentuan yang berlaku pada saat transaksi.
            </p>
          </div>

          {/* Hasil */}
          <div className="relative flex flex-col justify-between gap-6 bg-[linear-gradient(155deg,#E01E2D_0%,#C41220_45%,#7E0B13_100%)] p-6 text-white sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.07]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/80">Estimasi setoran Anda</p>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white p-1.5">
                  <Image src="/brand/diva-t.png" alt="" width={30} height={30} className="h-full w-full object-contain" />
                </span>
              </div>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 font-extrabold leading-none tracking-tight" aria-live="polite">
                <span className="text-[clamp(2rem,10.5vw,2.6rem)] sm:text-6xl">Rp<Num v={monthly} /></span>
                <span className="text-lg font-bold text-white/85 sm:text-2xl">/bulan</span>
              </p>
              <p className="mt-2 text-sm text-white/85">
                Simulasi cicilan sisa DP USD {SISA_DP_USD.toLocaleString("en-US")} selama {tenor} bulan dengan kurs {rupiah(kurs)}/USD.
              </p>
              <p className="mt-4 rounded-xl bg-white/10 p-3 text-[12px] leading-relaxed text-white/85">
                Angka ini simulasi cicilan sisa DP porsi — bukan harga keseluruhan perjalanan Haji (mulai USD 13.400).
                Porsi diproses setelah syarat & DP terpenuhi sesuai ketentuan resmi.
              </p>
            </div>
            <WaLink
              message={buildSimulationMessage(kurs, tenor)}
              event="simulation_whatsapp_click"
              data={{ kurs, tenor }}
              className="btn btn-white relative w-full"
            >
              <MessageCircle size={17} aria-hidden /> Kirim Simulasi ke WhatsApp
            </WaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
