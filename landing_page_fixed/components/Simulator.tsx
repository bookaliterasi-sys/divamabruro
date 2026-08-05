"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calculator, CheckCircle2, MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildSimulationMessage } from "@/lib/whatsapp";
import { rupiah } from "@/lib/wa";
import {
  KURS_DEFAULT,
  TENORS,
  TENOR_DEFAULT,
  SETORAN_AWAL_USD,
  SISA_DP_USD,
  TOTAL_DP_USD,
  cicilanBulanan,
  setoranAwalRupiah,
  sisaDpRupiah,
  totalDpRupiah,
} from "@/lib/simulasi";
import { track } from "@/lib/analytics";

function Num({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = prev.current;
    prev.current = value;

    if (from === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = Math.round(value).toLocaleString("id-ID");
      return;
    }

    const t0 = performance.now();
    let raf = 0;

    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 280);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (value - from) * eased;
      el.textContent = Math.round(current).toLocaleString("id-ID");
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span ref={ref}>{Math.round(value).toLocaleString("id-ID")}</span>;
}

export default function Simulator() {
  const [kursRaw, setKursRaw] = useState(String(KURS_DEFAULT));
  const [activeTenorIndex, setActiveTenorIndex] = useState(TENORS.indexOf(TENOR_DEFAULT));
  const started = useRef(false);

  const kurs = Math.min(30000, Math.max(10000, Number(kursRaw) || KURS_DEFAULT));
  const tenor = TENORS[activeTenorIndex];
  const totalDp = totalDpRupiah(kurs);
  const setoranAwal = setoranAwalRupiah(kurs);
  const sisaDp = sisaDpRupiah(kurs);
  const monthly = cicilanBulanan(kurs, tenor);

  const startIfNeeded = () => {
    if (!started.current) {
      started.current = true;
      track("simulation_started", {});
    }
  };

  const handleKursChange = (value: string) => {
    startIfNeeded();
    setKursRaw(value);

    const nextKurs = Math.min(30000, Math.max(10000, Number(value) || KURS_DEFAULT));
    track("simulation_changed", { field: "kurs", kurs: nextKurs, tenor });
  };

  const handleTenorChange = (index: number) => {
    startIfNeeded();
    const nextTenor = TENORS[index];
    setActiveTenorIndex(index);
    track("simulation_tenor_selected", { tenor: nextTenor });
    track("simulation_changed", { field: "tenor", kurs, tenor: nextTenor });
  };

  return (
    <section
      id="simulasi"
      className="blend relative overflow-hidden bg-[linear-gradient(180deg,#FFF8F3_0%,#FFF2EC_45%,#FDE7EA_100%)] py-16 sm:py-24"
      style={{ "--blend-top": "#FFF8F3", "--blend-bottom": "#FDE7EA" } as React.CSSProperties}
      aria-labelledby="simulator-heading"
    >
      <div aria-hidden className="tint-blob -left-20 top-12 h-72 w-72 bg-rose/20" />
      <div aria-hidden className="tint-blob -right-20 bottom-12 h-72 w-72 bg-gold/15" />
      <div className="shell relative">
        <div className="max-w-3xl">
          <p className="kicker">Simulator Cicilan</p>
          <h2 id="simulator-heading" data-fx className="h-display mt-3 text-[30px] sm:text-4xl lg:text-[3rem]">
            Simulasi sederhana untuk melihat estimasi cicilan porsi Anda.
          </h2>
          <p data-fx className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
            Angka di bawah membantu Anda membaca skema setoran awal, sisa DP, pilihan tenor, dan estimasi per bulan.
            Ini <strong className="text-ink">bukan harga keseluruhan perjalanan</strong>, melainkan simulasi agar langkah awal terasa lebih jelas.
          </p>
        </div>

        <div data-fx className="mt-8 rounded-[2rem] border border-line/90 bg-white/85 p-4 shadow-[0_32px_80px_-50px_rgba(92,8,16,.3)] backdrop-blur-sm sm:p-6 lg:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,.98fr)] lg:gap-6">
            <div className="space-y-5 rounded-[1.75rem] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7F1_100%)] p-5 ring-1 ring-[#f4dedf] sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="pill-soft">
                  <Calculator size={14} aria-hidden /> Angka ini hanya simulasi
                </span>
                <p className="text-sm text-ink-2">Konfirmasi akhir tetap dilakukan bersama konsultan Diva Mabruro.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="kurs" className="block text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">
                  Kurs yang digunakan
                </label>
                <div className="input-group overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_36px_-28px_rgba(92,8,16,.35)]">
                  <span className="pl-4 text-sm font-bold text-ink-2" aria-hidden>
                    Rp
                  </span>
                  <input
                    id="kurs"
                    type="number"
                    min={10000}
                    max={30000}
                    step={100}
                    inputMode="numeric"
                    value={kursRaw}
                    onFocus={startIfNeeded}
                    onChange={(e) => handleKursChange(e.target.value)}
                    className="h-14 w-full min-w-0 bg-transparent px-2 text-[18px] font-bold text-ink outline-none"
                    aria-describedby="simulator-note"
                  />
                  <span className="pr-4 text-sm font-bold text-ink-2" aria-hidden>
                    / USD
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">Pilihan tenor</p>
                <div className="tabs" role="tablist" aria-label="Pilihan tenor cicilan" style={{ "--n": TENORS.length, "--i": activeTenorIndex } as React.CSSProperties}>
                  <span aria-hidden className="ind" />
                  {TENORS.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      role="tab"
                      aria-selected={activeTenorIndex === index}
                      data-on={activeTenorIndex === index}
                      aria-label={`${item} bulan`}
                      onClick={() => handleTenorChange(index)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-[1.4rem] border border-line bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2">Setoran awal</p>
                  <p className="mt-2 text-[15px] font-extrabold text-ink">USD {SETORAN_AWAL_USD.toLocaleString("en-US")}</p>
                  <p className="mt-1 text-sm text-ink-2">≈ {rupiah(setoranAwal)}</p>
                </div>
                <div className="rounded-[1.4rem] border border-line bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2">Sisa DP</p>
                  <p className="mt-2 text-[15px] font-extrabold text-ink">USD {SISA_DP_USD.toLocaleString("en-US")}</p>
                  <p className="mt-1 text-sm text-ink-2">≈ {rupiah(sisaDp)}</p>
                </div>
                <div className="rounded-[1.4rem] border border-line bg-white p-4 sm:col-span-2 xl:col-span-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2">Total DP porsi</p>
                  <p className="mt-2 text-[15px] font-extrabold text-ink">USD {TOTAL_DP_USD.toLocaleString("en-US")}</p>
                  <p className="mt-1 text-sm text-ink-2">≈ {rupiah(totalDp)}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.9rem] bg-[linear-gradient(150deg,#5C0810_0%,#7E0B13_38%,#C41220_78%,#E01E2D_100%)] p-5 text-white shadow-[0_42px_90px_-46px_rgba(92,8,16,.75)] sm:p-6 lg:p-7">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.08]" />
              <div aria-hidden className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-white/10" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/75">Estimasi per bulan</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      Berdasarkan sisa DP USD {SISA_DP_USD.toLocaleString("en-US")} dengan tenor {tenor} bulan.
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                    <Image src="/brand/diva-t.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                  </span>
                </div>

                <div className="mt-6 rounded-[1.7rem] bg-white/10 px-4 py-5 ring-1 ring-white/10 backdrop-blur-[2px] sm:px-5 sm:py-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">Perkiraan cicilan</p>
                  <p className="mt-3 flex flex-wrap items-end gap-2 leading-none" aria-live="polite">
                    <span className="text-[clamp(2.4rem,8vw,4.6rem)] font-extrabold tracking-[-0.05em]">
                      Rp<Num value={monthly} />
                    </span>
                    <span className="pb-1 text-lg font-semibold text-white/80 sm:text-xl">/bulan</span>
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-white/82 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/12 bg-white/8 px-3 py-3">
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-white/62">Kurs</span>
                      <strong className="mt-1 block text-[15px] text-white">{rupiah(kurs)}/USD</strong>
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-white/8 px-3 py-3">
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-white/62">Tenor</span>
                      <strong className="mt-1 block text-[15px] text-white">{tenor} bulan</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-white/85">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-white" aria-hidden />
                    <p>Simulasi ini membantu membaca skema awal, bukan menjadi invoice atau penawaran final.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-white" aria-hidden />
                    <p>Nilai rupiah dapat berubah mengikuti kurs dan ketentuan yang berlaku saat transaksi.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-white" aria-hidden />
                    <p>Konfirmasi resmi dilakukan melalui konsultan Diva Mabruro sebelum Anda mengambil keputusan.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 sm:mt-auto">
                  <WaLink
                    message={buildSimulationMessage(kurs, tenor)}
                    event="simulation_whatsapp_click"
                    data={{ kurs, tenor, monthly }}
                    className="btn btn-white w-full"
                  >
                    <MessageCircle size={17} aria-hidden /> Kirim Hasil Simulasi ke WhatsApp
                  </WaLink>
                  <p className="text-center text-[12px] leading-relaxed text-white/70">
                    Konsultasi gratis dan tidak mengikat. Tim Diva Mabruro akan membantu menjelaskan simulasi ini.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="simulator-note"
            className="mt-4 rounded-[1.4rem] border border-[#f0d6d8] bg-[linear-gradient(180deg,#FFF9F6_0%,#FFF4EF_100%)] px-4 py-4 text-sm leading-relaxed text-ink-2 sm:px-5"
          >
            <strong className="text-ink">Catatan penting:</strong> simulasi ini bukan harga keseluruhan perjalanan Haji.
            Nilai yang tampil hanya untuk membantu memahami skema porsi, dan dapat berubah mengikuti kurs serta ketentuan.
            Konfirmasi resmi dilakukan melalui konsultan Diva Mabruro.
          </div>
        </div>
      </div>
    </section>
  );
}
