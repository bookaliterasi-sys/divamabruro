/** Section server-rendered Diva Mabruro — nol JavaScript klien. */
import Image from "next/image";
import { BadgeCheck, PiggyBank, ShieldCheck, Handshake, Armchair, FileCheck2, GraduationCap, PlaneTakeoff, HeartHandshake, Users, Home, Instagram, MapPin, Phone } from "lucide-react";
import WaLink from "@/components/WaLink";
import DivaEmblem from "@/components/DivaEmblem";
import AgeCalculator from "@/components/AgeCalculator";
import PosterCarousel from "@/components/PosterCarousel";
import TrackLink from "@/components/TrackLink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { HAJI_PKG } from "@/lib/packages";
import { WA_DISPLAY } from "@/lib/wa";

/* ---------- TRUST STRIP (marquee ringan) ---------- */
const TRUST_ITEMS = [
  { t: "PPIU No. 25/2019 & 874/2020", d: "Terdaftar Kemenag RI" },
  { t: "Provider PIHK aktif", d: "Penyelenggara Haji Khusus" },
  { t: "Kantor Sidoarjo & Surabaya", d: "Dapat dikunjungi langsung" },
  { t: "Rekening atas nama PT", d: "Bukan rekening pribadi" },
  { t: "Dokumentasi jamaah nyata", d: "Manasik & keberangkatan" },
  { t: "Pendampingan penuh", d: "Konsultasi hingga pulang" },
];
export function TrustStrip() {
  return (
    <div className="stage-blush py-6">
      <div className="trust-mask" aria-label="Bukti kepercayaan Diva Mabruro">
        <div className="trust-track">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch gap-3 pr-3">
              {TRUST_ITEMS.map((i) => (
                <span key={i.t + copy} className="flex w-[248px] shrink-0 items-start gap-2.5 rounded-2xl border border-red/15 bg-white/90 px-4 py-3 shadow-card">
                  <BadgeCheck size={17} aria-hidden className="mt-0.5 shrink-0 text-red" />
                  <span>
                    <span className="block text-[13.5px] font-bold leading-snug text-ink">{i.t}</span>
                    <span className="block text-[12px] text-ink-2">{i.d}</span>
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- SKEMA DP + KEUNGGULAN (gabungan) ---------- */
const STEPS = [
  { t: "Konsultasi gratis", d: "Diskusikan rencana Anda — untuk diri sendiri atau orang tua — tanpa kewajiban mendaftar." },
  { t: "Setoran awal USD 1.000", d: "Proses dimulai dengan setoran awal ke rekening resmi perusahaan." },
  { t: "Cicil sisa DP USD 4.000", d: "Pilih tenor 12–60 bulan. Simulasi kurs Rp18.000/USD: mulai sekitar Rp1,2 juta per bulan." },
  { t: "Porsi diproses", d: "Setelah syarat dan DP terpenuhi sesuai ketentuan resmi, porsi Anda diproses dan didampingi hingga berangkat." },
];
const PILLARS = [
  { icon: PiggyBank, t: "Dana lebih terarah", d: "Setoran awal, sisa DP, tenor, dan perkiraan cicilan dijelaskan terbuka." },
  { icon: ShieldCheck, t: "Amanah", d: "Didampingi sejak konsultasi, dokumen, manasik, hingga perjalanan ibadah." },
  { icon: Handshake, t: "Koordinasi efisien", d: "Pengaturan perjalanan yang rapi agar layanan sepadan dengan biayanya." },
  { icon: Armchair, t: "Kenyamanan jamaah", d: "Dirancang agar Anda dan orang tua fokus beribadah, termasuk jamaah lansia." },
];
export function Skema() {
  return (
    <section id="skema" className="stage-deep on-deep relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#5C0810", "--blend-bottom": "#5C0810" } as React.CSSProperties}>
      <div aria-hidden className="wave-top"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#F6C9CE" /></svg></div>
      <div aria-hidden className="wave-bottom"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#FFF8F2" /></svg></div>
      <div aria-hidden className="deco pat-grid inset-y-0 left-0 w-2/5 [mask-image:linear-gradient(270deg,transparent,#000_60%)]" />
      <div className="shell relative">
        <div data-fx className="max-w-2xl">
          <p className="kicker">Skema Porsi Haji Khusus</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">
            “Haji Ala Sultan <span className="text-gold-light">Gak Harus Mahal</span>”
          </h2>
          <span aria-hidden className="rule-gold mt-4 block" />
          <p className="mt-4 text-[16px] leading-relaxed text-white/80">
            Kenyamanan Haji Khusus dapat direncanakan lewat skema setoran yang terarah dan transparan —
            dimulai dari <strong className="text-white">USD 1.000</strong>.
          </p>
        </div>

        <ol data-fx className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4" style={{ "--d": ".06s" } as React.CSSProperties}>
          {STEPS.map((c, i) => (
            <li key={c.t} className="card card-accent relative overflow-hidden p-6 pl-7">
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] font-bold text-white/10">{i + 1}</span>
              <p className="relative text-[16px] font-bold text-white">{c.t}</p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">{c.d}</p>
            </li>
          ))}
        </ol>

        <div data-fx className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ "--d": ".1s" } as React.CSSProperties}>
          {PILLARS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-3.5 rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition-colors hover:border-gold/40">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-light"><Icon size={20} aria-hidden /></span>
              <div>
                <h3 className="text-[15px] font-bold text-white">{t}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-fx className="mt-8" style={{ "--d": ".14s" } as React.CSSProperties}>
          <TrackLink href="#simulasi" event="hero_cta_click" data={{ placement: "skema" }} className="btn btn-white">
            Hitung Cicilan Porsi Saya <span className="arr" aria-hidden>→</span>
          </TrackLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROGRAM HAJI ---------- */
export function Program() {
  const p = HAJI_PKG;
  return (
    <section id="program" className="stage-cream relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#FFF8F2", "--blend-bottom": "#FDE7EA" } as React.CSSProperties}>
      <div aria-hidden className="deco pat-star inset-0 [mask-image:radial-gradient(80%_70%_at_50%_30%,#000,transparent)]" />
      <div className="shell">
        <p className="kicker">Program Haji Khusus Diva</p>
        <h2 data-fx className="h-display mt-3 max-w-2xl text-3xl sm:text-4xl">Program yang tersedia saat ini</h2>

        <div data-fx className="card mt-10 overflow-hidden lg:grid lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-6 sm:p-8">
            <span className="badge-red">1 · Biaya perjalanan</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">{p.name}</h3>
            <p className="mt-1 text-sm font-semibold text-ink-2">Maskapai: {p.airline}</p>

            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-2">Hotel</p>
            <ul className="mt-2 space-y-2">
              {p.hotels.map((h) => (
                <li key={h.name} className="flex items-center justify-between rounded-xl bg-off px-4 py-2.5 text-sm">
                  <span className="font-bold text-ink">{h.name}</span>
                  <span className="text-ink-2">{h.city} · {"★".repeat(h.stars)}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-1.5">
              {p.notes.map((n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-ink-2">
                  <BadgeCheck size={16} aria-hidden className="mt-0.5 shrink-0 text-red" /> {n}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-line text-center">
              {[["Quad", p.priceQuad], ["Triple", p.priceTriple], ["Double", p.priceDouble]].map(([l, v], i) => (
                <div key={l as string} className={`px-2 py-3 ${i > 0 ? "border-l border-line" : ""}`}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-2">{l}</p>
                  <p className="mt-0.5 text-[15px] font-extrabold text-red">USD {(v as number).toLocaleString("en-US")}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-ink-2">Biaya program per orang. Detail jadwal & ketersediaan: konfirmasi dengan konsultan.</p>
          </div>

          <div className="flex flex-col justify-between gap-5 border-t border-line bg-[linear-gradient(160deg,#FDEEF0,#FFF4EC)] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-red">2 · DP porsi (proses nomor porsi)</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                Angka ini <strong>berbeda</strong> dari biaya perjalanan di samping. DP porsi hanya untuk memproses nomor porsi Anda:
              </p>
              <ul className="mt-3 space-y-2 text-[15px] font-bold text-ink">
                <li className="flex justify-between rounded-xl bg-white px-4 py-2.5"><span>Total DP</span><span className="text-red">USD 5.000</span></li>
                <li className="flex justify-between rounded-xl bg-white px-4 py-2.5"><span>Setoran awal</span><span className="text-red">USD 1.000</span></li>
                <li className="flex justify-between rounded-xl bg-white px-4 py-2.5"><span>Sisa DP (dicicil)</span><span className="text-red">USD 4.000</span></li>
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-2">
                Yang dicicil adalah sisa DP porsi — bukan seluruh biaya perjalanan. Porsi diproses setelah syarat & DP terpenuhi sesuai ketentuan resmi.
              </p>
            </div>
            <WaLink message={buildGeneralMessage("program_haji")} event="haji_package_whatsapp_click" data={{ id: p.id }} className="btn btn-red w-full">
              Konsultasi Haji Khusus Gratis
            </WaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PENDAMPINGAN + ORANG TUA (gabungan) ---------- */
const CARE = [
  { icon: FileCheck2, t: "Pendampingan dokumen", d: "Paspor, visa, dan persyaratan diurus bersama tim." },
  { icon: GraduationCap, t: "Manasik terjadwal", d: "Materi & praktik sebelum berangkat, terdokumentasi." },
  { icon: PlaneTakeoff, t: "Handling keberangkatan", d: "Didampingi sejak bandara hingga tiba kembali." },
  { icon: HeartHandshake, t: "Muthawif di Tanah Suci", d: "Tim menyertai seluruh rangkaian ibadah Anda." },
  { icon: Users, t: "Ramah lansia & keluarga", d: "Kebutuhan khusus diperhatikan sejak konsultasi." },
  { icon: Home, t: "Purna perjalanan", d: "Komunikasi tidak berhenti saat Anda pulang." },
];
export function Pendampingan() {
  return (
    <section id="fasilitas" className="stage-blush relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#FFF4EC", "--blend-bottom": "#F8CDD3" } as React.CSSProperties}>
      <svg aria-hidden viewBox="0 0 120 120" fill="none" className="deco -left-10 -top-10 h-64 w-64 text-red/[0.07]">
        <path d="M14 98 C 8 46, 44 12, 102 9" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M32 108 C 26 60, 60 26, 112 22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div data-fx>
            <p className="kicker">Pendampingan Jamaah</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl">
              Perjalanan ibadah terbaik — <span className="grad-text">juga untuk orang tua Anda</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-2">
              Kenyamanan bukan sekadar kemewahan. Bagi jamaah lanjut usia, fasilitas yang baik, pendampingan
              yang sigap, dan perjalanan yang tertata membantu mereka beribadah dengan lebih tenang.
            </p>
          </div>
          <div data-fx className="mt-7 grid gap-3 sm:grid-cols-2" style={{ "--d": ".08s" } as React.CSSProperties}>
            {CARE.map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-3.5 rounded-2xl border border-line bg-[linear-gradient(160deg,#FFFFFF,#FFFAF9)] p-4 transition-colors hover:border-red/35">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(140deg,#FDEEF0,#FAD9DD)] text-red"><Icon size={18} aria-hidden /></span>
                <div>
                  <h3 className="text-[14.5px] font-bold text-ink">{t}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-2">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-fx className="mt-7" style={{ "--d": ".12s" } as React.CSSProperties}>
            <WaLink message={buildGeneralMessage("pendampingan")} event="parent_consultation_click" data={{ placement: "pendampingan" }} className="btn btn-red">
              Konsultasi Haji Khusus Gratis
            </WaLink>
            <p className="mt-3 text-[12px] text-ink-2">Gratis konsultasi awal, tanpa kewajiban mendaftar.</p>
          </div>
        </div>

        <div data-fx className="relative mx-auto w-full max-w-[240px] sm:max-w-[340px]" style={{ "--d": ".1s" } as React.CSSProperties}>
          <div aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded-t-[2rem] rounded-b-[7rem] bg-red-soft" />
          <div className="relative"><DivaEmblem /><span className="badge-red absolute left-4 top-4 z-10">Bersama Diva</span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HAJI KHUSUS VS REGULER (kalkulator usia) ---------- */
export function QueueCompare() {
  return (
    <section id="antrean" className="stage-cream relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#FFF8F2", "--blend-bottom": "#FDE7EA" } as React.CSSProperties}>
      <div aria-hidden className="deco pat-grid inset-y-0 right-0 w-2/5 [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      <div className="shell relative grid items-start gap-8 lg:grid-cols-[.95fr_1.05fr]">
        <div data-fx>
          <p className="kicker">Haji Khusus vs Reguler</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">
            Kalau daftar sekarang, <span className="grad-text">berangkatnya usia berapa?</span>
          </h2>
          <span aria-hidden className="rule-gold mt-4 block" />
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-2">
            Selisihnya bukan sekadar biaya — melainkan <strong className="text-ink">waktu hidup Anda</strong>.
            Masa tunggu Haji Khusus ±5–9 tahun, sedangkan reguler dapat ±25–40 tahun.
          </p>
          <p className="mt-3 text-[13px] text-ink-2">Semakin lama menunda, semakin panjang antrean yang harus dilalui.</p>
        </div>
        <div data-fx style={{ "--d": ".08s" } as React.CSSProperties}>
          <AgeCalculator />
        </div>
      </div>
    </section>
  );
}

/* ---------- LEGALITAS & CHECKLIST AMANAH ---------- */
const CHECKS = [
  "Minta bukti legalitas tertulis beserta nomor izin resmi.",
  "Pastikan porsi didaftarkan mengikuti mekanisme resmi Kementerian Haji.",
  "Minta simulasi biaya, skema setoran, dan jadwal secara tertulis.",
  "Pastikan pembayaran hanya ke rekening atas nama perusahaan (PT).",
];
export function Legalitas() {
  return (
    <section id="legalitas" className="stage-deep on-deep relative overflow-hidden pb-10 pt-16 sm:pb-14 sm:pt-24 blend" style={{ "--blend-top": "#5C0810", "--blend-bottom": "#5C0810" } as React.CSSProperties}>
      <div aria-hidden className="wave-top"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#F8CDD3" /></svg></div>
      <div aria-hidden className="wave-bottom"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#FFF8F2" /></svg></div>
      <div aria-hidden className="deco pat-star inset-0 [mask-image:radial-gradient(75%_65%_at_50%_35%,#000,transparent)]" />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <div data-fx>
          <p className="kicker">Pastikan Travel Resmi</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">Pilih yang <span className="text-gold-light">resmi</span> — jangan hanya tergiur cepat.</h2>
          <span aria-hidden className="rule-gold mt-4 block" />
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/80">
            Diva Mabruro terdaftar resmi di Kementerian Agama RI sebagai penyelenggara perjalanan ibadah,
            dan tercatat aktif sebagai provider Penyelenggara Ibadah Haji Khusus.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Izin PPIU", n: "No. 25 Tahun 2019", d: "Penyelenggara Perjalanan Ibadah Umrah — Kementerian Agama RI." },
              { t: "Provider PIHK", n: "No. 874 Tahun 2020", d: "Tercatat aktif sebagai provider Penyelenggara Ibadah Haji Khusus." },
            ].map((c) => (
              <div key={c.n} className="rounded-2xl border border-white/15 bg-white/[0.07] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-gold-light"><ShieldCheck size={19} aria-hidden /></span>
                <p className="chip-gold mt-3">{c.t}</p>
                <p className="font-display text-xl font-bold text-white">{c.n}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-fx className="rounded-[28px] border border-white/15 bg-white/[0.07] p-6 sm:p-8" style={{ "--d": ".1s" } as React.CSSProperties}>
          <h3 className="font-display text-2xl font-bold text-white">Sebelum Anda transfer, pastikan:</h3>
          <ul className="mt-5 space-y-3">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4">
                <BadgeCheck size={18} aria-hidden className="mt-0.5 shrink-0 text-gold-light" />
                <span className="text-[14.5px] leading-relaxed text-white/90">{c}</span>
              </li>
            ))}
          </ul>
          <WaLink message={buildGeneralMessage("legalitas")} data={{ placement: "legalitas" }} className="btn btn-white mt-6 w-full">
            Minta Bukti Legalitas
          </WaLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- EDUKASI: SLIDE POSTER RESMI DIVA ---------- */
export function Edukasi() {
  return (
    <section id="edukasi" className="stage-wine relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#FDEEF0", "--blend-bottom": "#E9A3AC" } as React.CSSProperties}>
      <div className="shell relative">
        <div data-fx className="max-w-2xl">
          <p className="kicker">Pahami Dulu, Baru Putuskan</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">Bertahan di Haji Reguler, atau <span className="text-red-deep">beralih ke Haji Plus?</span></h2>
          <span aria-hidden className="rule-gold mt-4 block" />
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
            Bukan soal siapa yang lebih baik — tapi mana yang paling sesuai rencana Anda.
            Tarik atau geser kartu berikut untuk memahami perbedaannya.
          </p>
        </div>
      </div>
      <div data-fx className="relative mt-9 lg:shell" style={{ "--d": ".08s" } as React.CSSProperties}>
        <PosterCarousel />
      </div>

      <div data-fx className="shell relative mt-12" style={{ "--d": ".12s" } as React.CSSProperties}>
        <details className="group overflow-hidden rounded-[26px] border border-line bg-white">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-ink">
            Lihat rute perjalanan ibadah haji bersama Diva (12 tahapan)
            <span aria-hidden className="text-red transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
        <div className="border-t border-line">
          <Image
            src="/poster/rute.webp"
            alt="Infografis 12 tahapan rute perjalanan ibadah haji bersama Diva: Bandara Jeddah, Madinah, Makkah, Umrah Wajib, Mina, Arafah, Muzdalifah, Tawaf Ifadhah, lempar jumrah, Tawaf Wada, kembali ke tanah air"
            width={1280}
            height={720}
            sizes="(max-width: 1024px) 92vw, 1100px"
            className="h-auto w-full"
          />
        </div>
        </details>
      </div>
    </section>
  );
}

/* ---------- PROSES KONSULTASI (langkah + persona ringkas) ---------- */
const AFTER = [
  { t: "Dibalas manusia", d: "Pesan Anda dijawab konsultan Diva, bukan bot." },
  { t: "Dijelaskan, bukan dikejar", d: "Anda menerima skema, simulasi, dan dokumen tertulis." },
  { t: "Keputusan di tangan Anda", d: "Tanpa tekanan, tanpa kewajiban mendaftar." },
];
const PERSONAS = [
  { t: "Untuk diri sendiri", wa: "Assalamu'alaikum, dari website Diva Mabruro. Saya ingin konsultasi porsi Haji Khusus untuk diri saya sendiri." },
  { t: "Untuk orang tua", wa: "Assalamu'alaikum, dari website Diva Mabruro. Saya ingin konsultasi porsi Haji Khusus untuk orang tua saya." },
  { t: "Berangkat berdua", wa: "Assalamu'alaikum, dari website Diva Mabruro. Saya ingin konsultasi dua porsi Haji Khusus agar bisa berangkat bersama." },
];
export function Proses() {
  return (
    <section id="proses" className="stage-blush relative overflow-hidden py-16 sm:py-24 blend" style={{ "--blend-top": "#FFF4EC", "--blend-bottom": "#F8CDD3" } as React.CSSProperties}>
      <div className="shell relative">
        <div data-fx className="max-w-2xl">
          <p className="kicker">Proses Konsultasi</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">Apa yang terjadi setelah Anda chat?</h2>
        </div>
        <div data-fx className="mt-8 grid gap-4 sm:grid-cols-3" style={{ "--d": ".06s" } as React.CSSProperties}>
          {AFTER.map((c, i) => (
            <div key={c.t} className="card card-accent relative overflow-hidden p-6 pl-7">
              <span aria-hidden className="num-ghost absolute -right-1 -top-6 text-[5.5rem]">{i + 1}</span>
              <p className="relative text-[16px] font-bold text-ink">{c.t}</p>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-2">{c.d}</p>
            </div>
          ))}
        </div>

        <div data-fx className="mt-8 rounded-[28px] border border-line bg-white p-6 sm:p-7" style={{ "--d": ".1s" } as React.CSSProperties}>
          <p className="text-[15px] font-bold text-ink">Rencana Haji Khusus ini untuk siapa?</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PERSONAS.map((c) => (
              <WaLink key={c.t} message={c.wa} data={{ placement: "persona", persona: c.t }} className="btn btn-outline w-full">
                {c.t}
              </WaLink>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink-2">Semua tombol menuju satu tujuan: konsultasi gratis via WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA PENUTUP ---------- */
export function FinalCta() {
  return (
    <section id="konsultasi" className="relative overflow-hidden bg-[radial-gradient(125%_110%_at_50%_-5%,#E01E2D_0%,#C41220_28%,#7E0B13_62%,#41060C_100%)] text-white">
      <div aria-hidden className="wave-top"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#FFF4EC" /></svg></div>
      <span aria-hidden className="watermark pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[24vw] font-bold leading-none sm:text-[15rem]">
        HAJI PLUS
      </span>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-red-deep/30 via-transparent to-black/25" />
      <div data-fx className="shell relative py-28 text-center sm:py-36">
        <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-white/75">Diva Mabruro, Mendampingi Ibadah dengan Nyaman dan Amanah</p>
        <h2 className="h-display mx-auto mt-4 max-w-2xl text-3xl !text-white sm:text-5xl">Rencanakan Haji Khusus dengan Lebih Tenang</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
          Mulai dari konsultasi, pahami skema pembayarannya, lalu pilih rencana yang paling sesuai untuk Anda dan keluarga.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <WaLink message={buildGeneralMessage("cta_penutup")} data={{ placement: "final_cta" }} className="btn btn-white">
            Konsultasi Haji Khusus Gratis
          </WaLink>
          <TrackLink href="#simulasi" event="hero_cta_click" data={{ placement: "final_cta" }} className="btn btn-ghost-white">
            Hitung Simulasi Sekarang
          </TrackLink>
        </div>
        <p className="mt-4 text-[12px] text-white/70">Gratis konsultasi awal, tanpa kewajiban mendaftar · Konsultan online 08.00–20.00 WIB</p>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white">
      <div className="shell pb-28 pt-12 md:pb-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/brand/diva-t.png" alt="Logo Diva Mabruro" width={52} height={52} className="h-12 w-12 object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold text-ink">Diva Mabruro</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-red">Umrah & Haji Plus</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
              Diva Mabruro, Mendampingi Ibadah dengan Nyaman dan Amanah. “Haji Ala Sultan Gak Harus Mahal.”
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-2">Kantor</p>
            <ul className="mt-3 space-y-3 text-sm text-ink-2">
              <li className="flex gap-2.5"><MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-red" /> Juanda Business Center (JBC) Blok A8-9, Jl. Raya Bandara Juanda, Gedangan, Sidoarjo 61254</li>
              <li className="flex gap-2.5"><MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-red" /> Jl. Ahmad Yani No. 151, Surabaya</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-2">Terhubung</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a href="https://instagram.com/divaumrohhaji" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-ink-2 transition-colors hover:text-red">
                  <Instagram size={16} aria-hidden className="text-red" /> @divaumrohhaji
                </a>
              </li>
              <li>
                <WaLink message={buildGeneralMessage("footer")} event="contact_clicked" data={{ channel: "wa_footer" }} className="flex items-center gap-2.5 text-ink-2 transition-colors hover:text-red">
                  <Phone size={16} aria-hidden className="text-red" /> {WA_DISPLAY}
                </WaLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 space-y-2 border-t border-line pt-6 text-[12px] leading-relaxed text-ink-2">
          <p>Seluruh pembayaran hanya ke rekening resmi atas nama PT Diva Mabruro — bukan rekening pribadi. Data yang Anda kirimkan melalui WhatsApp hanya digunakan untuk keperluan konsultasi.</p>
          <p>Disclaimer: nilai Rp1,2 juta/bulan merupakan simulasi cicilan sisa DP USD 4.000 selama 60 bulan dengan asumsi kurs Rp18.000/USD; nilai aktual mengikuti kurs & ketentuan program.</p>
          <p>© {year} PT Diva Mabruro. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
