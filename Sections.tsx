/** Section server-rendered Diva Mabruro — nol JavaScript klien. */
import Image from "next/image";
import { BadgeCheck, ShieldCheck, FileCheck2, GraduationCap, HeartHandshake, Users, Home, Instagram, MapPin, Phone, WalletCards, Route, SlidersHorizontal, ShieldQuestion, HandHeart, ArrowDownRight, PlaneTakeoff, Building2, CalendarDays, BedDouble, Landmark, MessageCircle, ClipboardCheck, UserRoundCheck } from "lucide-react";
import WaLink from "@/components/WaLink";
import AgeCalculator from "@/components/AgeCalculator";
import TrackLink from "@/components/TrackLink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { HAJI_PKG } from "@/lib/packages";
import { WA_DISPLAY } from "@/lib/wa";

/* ---------- TRUST STATEMENT — editorial proof row ---------- */
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    t: "Pembayaran resmi",
    d: "Pembayaran diarahkan melalui rekening resmi perusahaan, bukan rekening pribadi.",
  },
  {
    icon: HeartHandshake,
    t: "Pendampingan menyeluruh",
    d: "Dibantu sejak konsultasi, administrasi, persiapan, hingga keberangkatan.",
  },
  {
    icon: FileCheck2,
    t: "Skema transparan",
    d: "Setoran awal, sisa DP, pilihan tenor, dan tahapannya dijelaskan sebelum keputusan.",
  },
  {
    icon: Home,
    t: "Kantor dapat dikunjungi",
    d: "Calon jamaah dapat bertemu tim dan melakukan verifikasi secara langsung.",
  },
  {
    icon: Users,
    t: "Dokumentasi jamaah nyata",
    d: "Materi manasik dan perjalanan menggunakan dokumentasi jamaah yang tersedia.",
  },
  {
    icon: BadgeCheck,
    t: "Informasi legalitas",
    d: "Dokumen dan informasi legalitas dapat diperiksa serta dikonfirmasi kepada tim.",
  },
];

export function TrustStrip() {
  return (
    <section className="trust-editorial" aria-labelledby="trust-heading">
      <div className="shell trust-editorial__shell">
        <div data-fx className="trust-editorial__intro">
          <p className="trust-editorial__eyebrow">Bukti kepercayaan</p>
          <h2 id="trust-heading">Hal penting yang dapat Anda periksa sebelum memutuskan.</h2>
        </div>

        <div data-fx className="trust-editorial__viewport" style={{ "--d": ".07s" } as React.CSSProperties}>
          <div className="trust-editorial__row" role="list">
            {TRUST_ITEMS.map(({ icon: Icon, t, d }, index) => (
              <article className="trust-editorial__item" role="listitem" key={t}>
                <div className="trust-editorial__number" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <Icon className="trust-editorial__icon" size={20} strokeWidth={1.8} aria-hidden />
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="trust-editorial__note">
          Seluruh detail dapat dikonfirmasi terlebih dahulu sebelum Anda melakukan pembayaran.
        </p>
      </div>
    </section>
  );
}


/* ---------- PROBLEM TO POSSIBILITY — narasi empatik dan faktual ---------- */
const POSSIBILITY_ITEMS = [
  {
    icon: WalletCards,
    concern: "Mengira Haji Khusus harus dibayar sekaligus.",
    possibility: "Mulai dengan memahami setoran awal, sisa DP, dan pilihan tenor sebelum menentukan keputusan.",
  },
  {
    icon: Route,
    concern: "Belum memahami proses mendapatkan porsi.",
    possibility: "Setiap tahap dapat dijelaskan berurutan, dari konsultasi dan persyaratan hingga proses porsi sesuai ketentuan.",
  },
  {
    icon: SlidersHorizontal,
    concern: "Bingung menentukan skema cicilan.",
    possibility: "Gunakan simulasi untuk membandingkan tenor dan estimasi setoran yang paling masuk akal bagi kondisi keluarga.",
  },
  {
    icon: ShieldQuestion,
    concern: "Khawatir terhadap keamanan pembayaran.",
    possibility: "Periksa rekening resmi, dokumen, legalitas, serta alur pembayaran sebelum melakukan transfer.",
  },
  {
    icon: HandHeart,
    concern: "Ingin memberangkatkan orang tua dengan nyaman.",
    possibility: "Rencanakan kebutuhan pendampingan sejak awal agar layanan dapat disesuaikan dengan kondisi jamaah.",
  },
];

export function ProblemPossibility() {
  return (
    <section id="rencana" className="problem-possibility" aria-labelledby="possibility-heading">
      <div aria-hidden className="problem-possibility__orb problem-possibility__orb--one" />
      <div aria-hidden className="problem-possibility__orb problem-possibility__orb--two" />

      <div className="shell problem-possibility__layout">
        <div data-fx className="problem-possibility__intro">
          <p className="problem-possibility__eyebrow">Dari ragu menjadi lebih jelas</p>
          <h2 id="possibility-heading">
            Rencana besar tidak harus dimulai dengan keputusan yang terburu-buru.
          </h2>
          <p className="problem-possibility__lead">
            Banyak keluarga menunda karena prosesnya terlihat rumit. Langkah pertama yang lebih tenang adalah
            memahami skema, memeriksa informasinya, lalu menyesuaikannya dengan kesiapan Anda.
          </p>
          <div className="problem-possibility__intro-line" aria-hidden />
          <p className="problem-possibility__note">
            Diva Mabruro membantu menjelaskan pilihan secara bertahap. Keputusan tetap berada di tangan Anda.
          </p>
        </div>

        <div className="problem-possibility__content">
          <div className="problem-possibility__list" role="list">
            {POSSIBILITY_ITEMS.map(({ icon: Icon, concern, possibility }, index) => (
              <article
                data-fx
                className="problem-possibility__item"
                role="listitem"
                key={concern}
                style={{ "--d": `${index * 0.055}s` } as React.CSSProperties}
              >
                <div className="problem-possibility__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="problem-possibility__icon" aria-hidden>
                  <Icon size={21} strokeWidth={1.75} />
                </div>
                <div className="problem-possibility__statement">
                  <span>Yang sering dirasakan</span>
                  <h3>{concern}</h3>
                </div>
                <ArrowDownRight className="problem-possibility__arrow" size={22} strokeWidth={1.55} aria-hidden />
                <div className="problem-possibility__answer">
                  <span>Langkah yang memungkinkan</span>
                  <p>{possibility}</p>
                </div>
              </article>
            ))}
          </div>

          <div data-fx className="problem-possibility__solution" style={{ "--d": ".12s" } as React.CSSProperties}>
            <div>
              <p className="problem-possibility__solution-label">Solusi Diva Mabruro</p>
              <h3>Pahami rencananya lebih dahulu, baru tentukan langkah terbaik.</h3>
              <p>
                Konsultasikan kebutuhan, coba simulasi, dan verifikasi informasi penting tanpa kewajiban langsung mendaftar.
              </p>
            </div>
            <div className="problem-possibility__actions">
              <WaLink
                message={buildGeneralMessage("problem_possibility")}
                event="problem_possibility_whatsapp_click"
                data={{ placement: "problem_possibility" }}
                className="btn btn-red"
              >
                Bicarakan Rencana Saya <span className="arr" aria-hidden>→</span>
              </WaLink>
              <TrackLink
                href="#simulasi"
                event="problem_possibility_simulator_click"
                data={{ placement: "problem_possibility_simulator" }}
                className="btn btn-outline"
              >
                Coba Simulator
              </TrackLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROGRAM HAJI KHUSUS — focused program showcase ---------- */
export function Program() {
  const p = HAJI_PKG;
  const roomOptions = [
    { label: "Quad", detail: "4 orang/kamar", value: p.priceQuad },
    { label: "Triple", detail: "3 orang/kamar", value: p.priceTriple },
    { label: "Double", detail: "2 orang/kamar", value: p.priceDouble },
  ];

  return (
    <section id="program" className="haji-program" aria-labelledby="haji-program-heading">
      <div aria-hidden className="haji-program__glow haji-program__glow--one" />
      <div aria-hidden className="haji-program__glow haji-program__glow--two" />

      <div className="shell haji-program__shell">
        <header className="haji-program__intro">
          <div data-fx>
            <p className="kicker">Program Haji Khusus</p>
            <h2 id="haji-program-heading">Satu program aktif, dijelaskan dalam satu pandangan yang jelas.</h2>
          </div>
          <p data-fx style={{ "--d": ".08s" } as React.CSSProperties}>
            Informasi berikut menggunakan data program yang sudah tersedia di proyek. Nilai, jadwal, hotel, maskapai,
            dan ketersediaan tetap perlu dikonfirmasi kembali kepada konsultan sebelum pendaftaran.
          </p>
        </header>

        <article data-fx className="haji-program__showcase">
          <div className="haji-program__hero">
            <div className="haji-program__hero-copy">
              <div className="haji-program__status-row">
                <span className="haji-program__status"><span aria-hidden /> Paket tersedia untuk konsultasi</span>
                <span className="haji-program__duration"><CalendarDays size={15} aria-hidden /> {p.durationDays} hari</span>
              </div>

              <p className="haji-program__overline">Diva Mabruro</p>
              <h3>{p.name}</h3>
              <div className="haji-program__airline">
                <PlaneTakeoff size={19} aria-hidden />
                <span><small>Maskapai tercantum</small><strong>{p.airline}</strong></span>
              </div>
            </div>

            <div className="haji-program__route" aria-label="Ringkasan perjalanan program">
              <span className="haji-program__route-line" aria-hidden />
              <div><span>01</span><strong>Persiapan</strong><small>Konsultasi dan dokumen</small></div>
              <div><span>02</span><strong>Perjalanan</strong><small>Program Non Arbain</small></div>
              <div><span>03</span><strong>Kepulangan</strong><small>Pendampingan hingga selesai</small></div>
            </div>
          </div>

          <div className="haji-program__content">
            <div className="haji-program__details">
              <section className="haji-program__block" aria-labelledby="program-accommodation-heading">
                <div className="haji-program__block-heading">
                  <Building2 size={19} aria-hidden />
                  <div>
                    <p>Akomodasi tercantum</p>
                    <h4 id="program-accommodation-heading">Hotel dalam materi program</h4>
                  </div>
                </div>
                <div className="haji-program__hotel-list">
                  {p.hotels.map((hotel, index) => (
                    <div key={`${hotel.name}-${hotel.city}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><strong>{hotel.name}</strong><small>{hotel.city}</small></div>
                      <p>{hotel.stars} bintang</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="haji-program__block" aria-labelledby="program-notes-heading">
                <div className="haji-program__block-heading">
                  <BadgeCheck size={19} aria-hidden />
                  <div>
                    <p>Rangkaian utama</p>
                    <h4 id="program-notes-heading">Catatan program yang tersedia</h4>
                  </div>
                </div>
                <ul className="haji-program__notes">
                  {p.notes.map((note) => (
                    <li key={note}><BadgeCheck size={16} aria-hidden /> {note}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="haji-program__pricing" aria-label="Pilihan biaya dan skema pembayaran">
              <div>
                <p className="haji-program__pricing-label">Biaya perjalanan per orang</p>
                <h4>Pilih kebutuhan kamar</h4>
                <div className="haji-program__room-list">
                  {roomOptions.map((room) => (
                    <div key={room.label}>
                      <BedDouble size={18} aria-hidden />
                      <span><strong>{room.label}</strong><small>{room.detail}</small></span>
                      <p>USD {room.value.toLocaleString("en-US")}</p>
                    </div>
                  ))}
                </div>
                <p className="haji-program__price-note">
                  Biaya perjalanan bukan cicilan sisa DP porsi. Nilai dan ketersediaan kamar wajib dikonfirmasi kembali.
                </p>
              </div>

              <div className="haji-program__payment">
                <p>Skema awal porsi</p>
                <dl>
                  <div><dt>Total DP porsi</dt><dd>USD 5.000</dd></div>
                  <div><dt>Setoran awal</dt><dd>USD 1.000</dd></div>
                  <div><dt>Sisa DP</dt><dd>USD 4.000</dd></div>
                </dl>
                <small>
                  Sisa DP dapat disimulasikan berdasarkan pilihan tenor. Proses porsi mengikuti pemenuhan persyaratan dan ketentuan resmi.
                </small>
              </div>
            </aside>
          </div>

          <footer className="haji-program__footer">
            <div>
              <p>Perlu memeriksa kecocokan program?</p>
              <h4>Tanyakan jadwal, pilihan kamar, biaya, dan skema pembayarannya langsung kepada konsultan.</h4>
            </div>
            <div className="haji-program__actions">
              <WaLink
                message={buildGeneralMessage("program_haji")}
                event="haji_package_whatsapp_click"
                data={{ id: p.id, program: p.name }}
                className="btn btn-white"
              >
                Konsultasi Program via WhatsApp <span className="arr" aria-hidden>→</span>
              </WaLink>
              <TrackLink href="#simulasi" event="journey_simulator_click" data={{ placement: "program" }} className="haji-program__simulator-link">
                Buka kembali simulator
              </TrackLink>
            </div>
          </footer>
        </article>

        <p className="haji-program__disclaimer">
          Informasi program pada halaman ini bukan bukti pemesanan. Jadwal, maskapai, hotel, pilihan kamar, biaya,
          dan layanan mengikuti ketersediaan serta konfirmasi resmi dari Diva Mabruro.
        </p>
      </div>
    </section>
  );
}

/* ---------- VALUE & SERVICE EXPERIENCE — editorial journey ---------- */
const SERVICE_EXPERIENCE = [
  {
    phase: "Sebelum perjalanan",
    icon: Route,
    title: "Perencanaan lebih terarah",
    description: "Kebutuhan jamaah, kesiapan keluarga, pilihan program, dan langkah berikutnya dibahas sejak awal agar keputusan tidak terasa terburu-buru.",
  },
  {
    phase: "Sebelum perjalanan",
    icon: WalletCards,
    title: "Informasi skema yang transparan",
    description: "Setoran awal, sisa DP, tenor, biaya program, serta batas antara simulasi dan nilai resmi dijelaskan dengan bahasa yang mudah dipahami.",
  },
  {
    phase: "Sebelum perjalanan",
    icon: FileCheck2,
    title: "Pendampingan dokumen",
    description: "Tim membantu mengarahkan persiapan paspor, dokumen administrasi, dan persyaratan lain sesuai tahap yang sedang dijalani jamaah.",
  },
  {
    phase: "Menjelang keberangkatan",
    icon: GraduationCap,
    title: "Manasik dan persiapan",
    description: "Jamaah dibantu memahami rangkaian ibadah, kebutuhan perjalanan, serta hal praktis yang perlu dipersiapkan sebelum berangkat.",
  },
  {
    phase: "Selama perjalanan",
    icon: Users,
    title: "Kenyamanan jamaah dan orang tua",
    description: "Kondisi usia, kebutuhan pendampingan, ritme perjalanan, dan kenyamanan keluarga menjadi bagian penting dalam perencanaan layanan.",
  },
  {
    phase: "Setiap tahap",
    icon: Phone,
    title: "Konsultasi yang mudah",
    description: "Pertanyaan dapat disampaikan melalui WhatsApp sehingga jamaah dan keluarga mempunyai jalur komunikasi yang jelas saat membutuhkan penjelasan.",
  },
  {
    phase: "Sebelum, selama, dan setelah",
    icon: HeartHandshake,
    title: "Pendampingan yang tidak berhenti di keberangkatan",
    description: "Diva Mabruro menjaga kesinambungan komunikasi sejak perencanaan, selama rangkaian perjalanan, hingga jamaah kembali kepada keluarga.",
  },
];

export function Pendampingan() {
  return (
    <section id="fasilitas" className="service-experience" aria-labelledby="service-experience-heading">
      <div aria-hidden className="service-experience__halo service-experience__halo--left" />
      <div aria-hidden className="service-experience__halo service-experience__halo--right" />

      <div className="shell service-experience__shell">
        <header className="service-experience__header">
          <div data-fx>
            <p className="kicker">Value &amp; Service Experience</p>
            <h2 id="service-experience-heading" className="service-experience__title">
              Bukan hanya berangkat. Setiap tahap perlu terasa lebih terarah dan terjaga.
            </h2>
          </div>
          <div data-fx className="service-experience__header-copy" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Diva Mabruro menyatukan perencanaan, informasi, dokumen, persiapan ibadah, dan komunikasi keluarga
              dalam satu alur pendampingan yang mudah diikuti.
            </p>
            <p className="service-experience__microcopy">
              Detail layanan tetap menyesuaikan program, kondisi jamaah, dan ketentuan yang berlaku.
            </p>
          </div>
        </header>

        <div className="service-experience__body">
          <aside data-fx className="service-experience__aside">
            <p className="service-experience__aside-label">Satu perjalanan, tiga fase</p>
            <ol className="service-experience__phases" aria-label="Fase pendampingan Diva Mabruro">
              <li><span>01</span><strong>Sebelum</strong><small>Rencana, skema, dan dokumen.</small></li>
              <li><span>02</span><strong>Selama</strong><small>Ibadah, kenyamanan, dan komunikasi.</small></li>
              <li><span>03</span><strong>Setelah</strong><small>Kepulangan dan kelanjutan komunikasi.</small></li>
            </ol>
            <div className="service-experience__aside-rule" aria-hidden />
            <p className="service-experience__aside-quote">
              “Jamaah tidak hanya membutuhkan informasi. Mereka membutuhkan alur yang jelas dan orang yang dapat dihubungi.”
            </p>
          </aside>

          <div className="service-experience__list" role="list">
            {SERVICE_EXPERIENCE.map(({ phase, icon: Icon, title, description }, index) => (
              <article
                key={title}
                data-fx
                role="listitem"
                className="service-experience__item"
                style={{ "--d": `${Math.min(index * 0.045, 0.24)}s` } as React.CSSProperties}
              >
                <div className="service-experience__number" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="service-experience__icon" aria-hidden>
                  <Icon size={21} strokeWidth={1.7} />
                </div>
                <div className="service-experience__content">
                  <p className="service-experience__phase">{phase}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowDownRight className="service-experience__arrow" size={22} strokeWidth={1.5} aria-hidden />
              </article>
            ))}
          </div>
        </div>

        <div data-fx className="service-experience__closing" style={{ "--d": ".12s" } as React.CSSProperties}>
          <div>
            <p className="service-experience__closing-label">Mulai dari kebutuhan Anda</p>
            <h3>Ceritakan siapa yang ingin berangkat dan bentuk pendampingan yang dibutuhkan.</h3>
          </div>
          <div className="service-experience__closing-action">
            <WaLink
              message={buildGeneralMessage("pendampingan")}
              event="parent_consultation_click"
              data={{ placement: "service_experience" }}
              className="btn btn-red"
            >
              Konsultasikan Kebutuhan Jamaah <span className="arr" aria-hidden>→</span>
            </WaLink>
            <p>Konsultasi awal gratis dan tidak mengikat.</p>
          </div>
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

/* ---------- LEGALITAS & KEAMANAN — pusat verifikasi ---------- */
const SECURITY_POINTS = [
  {
    icon: FileCheck2,
    label: "Legalitas",
    title: "Dokumen dapat diminta sebelum mendaftar",
    description:
      "Minta dokumen legalitas dan informasi penyelenggara kepada tim Diva Mabruro, lalu cocokkan kembali sebelum mengambil keputusan.",
  },
  {
    icon: Landmark,
    label: "Rekening resmi",
    title: "Pastikan nama penerima adalah perusahaan",
    description:
      "Instruksi pembayaran diarahkan ke rekening resmi atas nama PT Diva Mabruro, bukan rekening pribadi. Verifikasi kembali nama rekening sebelum transfer.",
  },
  {
    icon: Building2,
    label: "Kantor",
    title: "Verifikasi dapat dilakukan secara langsung",
    description:
      "Kantor yang tercantum dalam proyek berada di Juanda Business Center, Sidoarjo, serta Jl. Ahmad Yani No. 151, Surabaya.",
  },
  {
    icon: MessageCircle,
    label: "Kontak resmi",
    title: `Satu nomor konsultasi: ${WA_DISPLAY}`,
    description:
      "Gunakan nomor WhatsApp yang tercantum di website untuk meminta dokumen, rincian skema, dan konfirmasi sebelum pembayaran.",
  },
  {
    icon: ClipboardCheck,
    label: "Proses pembayaran",
    title: "Pahami skema dan simpan rincian tertulis",
    description:
      "Pastikan nilai setoran, tujuan pembayaran, tahapan porsi, dan ketentuan program sudah dijelaskan sebelum transaksi dilakukan.",
  },
  {
    icon: UserRoundCheck,
    label: "Pendampingan",
    title: "Tetap didampingi setelah administrasi dimulai",
    description:
      "Pendampingan mencakup konsultasi, dokumen, manasik, persiapan, perjalanan ibadah, hingga kepulangan sesuai layanan yang dikonfirmasi.",
  },
];

const VERIFY_STEPS = [
  "Minta dan periksa dokumen legalitas yang relevan.",
  "Cocokkan nama rekening dengan nama perusahaan.",
  "Minta skema pembayaran dan ketentuan secara tertulis.",
  "Simpan bukti komunikasi serta bukti pembayaran.",
];

export function Legalitas() {
  return (
    <section id="legalitas" className="legal-security" aria-labelledby="legal-security-heading">
      <div aria-hidden className="legal-security__halo legal-security__halo--one" />
      <div aria-hidden className="legal-security__halo legal-security__halo--two" />

      <div className="shell legal-security__shell">
        <header data-fx className="legal-security__header">
          <div>
            <p className="legal-security__eyebrow">Legalitas dan keamanan</p>
            <h2 id="legal-security-heading">Kepercayaan dibangun dari hal yang dapat Anda periksa.</h2>
          </div>
          <p>
            Sebelum mendaftar atau melakukan pembayaran, verifikasi dokumen, rekening, kantor, dan kontak resmi.
            Tim Diva Mabruro dapat membantu menjelaskan setiap tahap tanpa perlu mengambil keputusan terburu-buru.
          </p>
        </header>

        <div className="legal-security__layout">
          <div className="legal-security__ledger" role="list">
            {SECURITY_POINTS.map(({ icon: Icon, label, title, description }, index) => (
              <article
                data-fx
                className="legal-security__row"
                role="listitem"
                key={label}
                style={{ "--d": `${index * 0.045}s` } as React.CSSProperties}
              >
                <span className="legal-security__number" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="legal-security__icon" aria-hidden>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="legal-security__copy">
                  <p>{label}</p>
                  <h3>{title}</h3>
                </div>
                <p className="legal-security__description">{description}</p>
              </article>
            ))}
          </div>

          <aside data-fx className="legal-security__verify" style={{ "--d": ".12s" } as React.CSSProperties}>
            <div className="legal-security__verify-mark" aria-hidden>
              <ShieldCheck size={26} strokeWidth={1.65} />
            </div>
            <p className="legal-security__verify-label">Sebelum melanjutkan</p>
            <h3>Lakukan empat pemeriksaan sederhana.</h3>
            <ol>
              {VERIFY_STEPS.map((step, index) => (
                <li key={step}>
                  <span aria-hidden>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <div className="legal-security__contact">
              <p>Kontak resmi</p>
              <strong>{WA_DISPLAY}</strong>
              <span>Konsultasi awal gratis dan tidak mengikat.</span>
            </div>

            <WaLink
              message={buildGeneralMessage("legalitas")}
              event="legal_whatsapp_click"
              data={{ placement: "legal_security" }}
              className="btn btn-white w-full"
            >
              Verifikasi dan Konsultasi Sekarang
            </WaLink>
          </aside>
        </div>

        <p data-fx className="legal-security__note">
          Informasi di bagian ini memakai data yang sudah tercantum dalam proyek. Detail dokumen, rekening, dan ketentuan terbaru tetap perlu dikonfirmasi langsung kepada tim Diva Mabruro.
        </p>
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

/* ---------- STEP 14 — FINAL CONVERSION SCENE ---------- */
export function FinalCta() {
  return (
    <section id="konsultasi" className="final-conversion" aria-labelledby="final-conversion-heading">
      <div aria-hidden className="final-conversion__glow final-conversion__glow--one" />
      <div aria-hidden className="final-conversion__glow final-conversion__glow--two" />
      <div aria-hidden className="final-conversion__line final-conversion__line--one" />
      <div aria-hidden className="final-conversion__line final-conversion__line--two" />

      <div className="shell final-conversion__shell">
        <div data-fx className="final-conversion__copy">
          <p className="final-conversion__eyebrow">Langkah berikutnya dimulai dari percakapan</p>
          <h2 id="final-conversion-heading">
            Rencana Haji Tidak Harus Dimulai dengan Menunggu Sempurna
          </h2>
          <p className="final-conversion__lead">
            Mulai dengan konsultasi, pahami skemanya, lalu tentukan langkah terbaik bersama tim Diva Mabruro.
          </p>

          <div className="final-conversion__actions">
            <WaLink
              message={buildGeneralMessage("cta_penutup")}
              event="final_whatsapp_click"
              data={{ placement: "final_conversion" }}
              className="btn btn-white final-conversion__button"
            >
              <MessageCircle size={18} aria-hidden /> Konsultasi Gratis via WhatsApp
            </WaLink>
            <p className="final-conversion__number">
              <span>WhatsApp resmi</span>
              <strong>{WA_DISPLAY}</strong>
            </p>
          </div>

          <div className="final-conversion__assurance" aria-label="Informasi konsultasi">
            <div>
              <span>Respons konsultasi</span>
              <p>Pesan Anda diteruskan kepada konsultan untuk dijawab secara personal.</p>
            </div>
            <div>
              <span>Tanpa tekanan</span>
              <p>Konsultasi awal gratis dan tidak mengikat Anda untuk langsung mendaftar.</p>
            </div>
          </div>
        </div>

        <div
          data-fx
          data-slot="final-cta-visual"
          className="final-conversion__visual"
          style={{ "--d": ".12s" } as React.CSSProperties}
          role="img"
          aria-label="Slot visual final yang siap diisi dokumentasi resmi Diva Mabruro"
        >
          <div aria-hidden className="final-conversion__visual-frame">
            <span className="final-conversion__visual-ring final-conversion__visual-ring--one" />
            <span className="final-conversion__visual-ring final-conversion__visual-ring--two" />
            <span className="final-conversion__visual-mark" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 15 — FOOTER RINGKAS & TERPERCAYA ---------- */
const FOOTER_NAV = [
  ["#skema", "Skema Porsi"],
  ["#simulasi", "Simulator"],
  ["#program", "Program Haji"],
  ["#dokumentasi", "Dokumentasi"],
  ["#pendampingan-jamaah", "Pendampingan"],
  ["#faq", "FAQ"],
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-labelledby="footer-brand-name">
      <div aria-hidden className="site-footer__glow site-footer__glow--one" />
      <div aria-hidden className="site-footer__glow site-footer__glow--two" />

      <div className="shell site-footer__shell">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <a href="#hero" className="site-footer__identity" aria-label="Diva Mabruro — kembali ke bagian awal">
              <span className="site-footer__logo">
                <Image
                  src="/brand/diva-t.png"
                  alt="Logo Diva Mabruro"
                  width={54}
                  height={54}
                  className="h-full w-full object-contain"
                />
              </span>
              <span>
                <strong id="footer-brand-name">Diva Mabruro</strong>
                <small>Umrah &amp; Haji Plus</small>
              </span>
            </a>

            <p className="site-footer__description">
              Membantu keluarga memahami program Haji Khusus, menyiapkan dokumen, dan merencanakan perjalanan
              melalui konsultasi yang lebih jelas dan bertahap.
            </p>

            <div className="site-footer__social">
              <a
                href="https://instagram.com/divaumrohhaji"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buka Instagram Diva Mabruro"
              >
                <Instagram size={17} aria-hidden /> @divaumrohhaji
              </a>
              <WaLink
                message={buildGeneralMessage("footer")}
                event="contact_clicked"
                data={{ channel: "wa_footer", placement: "footer" }}
                ariaLabel="Hubungi WhatsApp resmi Diva Mabruro"
              >
                <Phone size={17} aria-hidden /> {WA_DISPLAY}
              </WaLink>
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Navigasi footer">
            <p className="site-footer__heading">Jelajahi</p>
            <div>
              {FOOTER_NAV.map(([href, label]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="site-footer__office">
            <p className="site-footer__heading">Kantor yang tersedia</p>
            <address>
              <p>
                <MapPin size={17} aria-hidden />
                <span>Juanda Business Center Blok A8–9, Jl. Raya Bandara Juanda, Gedangan, Sidoarjo 61254</span>
              </p>
              <p>
                <MapPin size={17} aria-hidden />
                <span>Jl. Ahmad Yani No. 151, Surabaya</span>
              </p>
            </address>
          </div>
        </div>

        <div className="site-footer__verification">
          <div className="site-footer__verification-icon" aria-hidden>
            <ShieldCheck size={21} strokeWidth={1.7} />
          </div>
          <div>
            <p>Legalitas dan keamanan</p>
            <span>
              Dokumen legalitas, rekening resmi, dan prosedur pembayaran dapat diminta serta dikonfirmasi kepada tim
              sebelum transaksi.
            </span>
          </div>
          <a href="#legalitas">Lihat cara verifikasi</a>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} PT Diva Mabruro. Seluruh hak cipta dilindungi.</p>
          <div className="site-footer__legal-copy">
            <p>
              <strong>Privasi:</strong> data yang dikirim melalui WhatsApp digunakan untuk kebutuhan konsultasi.
            </p>
            <p>
              <strong>Disclaimer:</strong> simulasi bukan harga keseluruhan perjalanan. Nilai aktual mengikuti kurs,
              ketersediaan, dan ketentuan yang dikonfirmasi konsultan.
            </p>
          </div>
          <a href="#hero" className="site-footer__back-top">Kembali ke atas ↑</a>
        </div>
      </div>
    </footer>
  );
}

