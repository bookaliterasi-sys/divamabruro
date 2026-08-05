"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  MessageCircleMore,
  PlaneTakeoff,
  WalletCards,
} from "lucide-react";
import WaLink from "@/components/WaLink";
import TrackLink from "@/components/TrackLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const JOURNEY_STEPS = [
  {
    icon: MessageCircleMore,
    title: "Konsultasi kebutuhan",
    short: "Mulai dari rencana Anda",
    description:
      "Ceritakan kebutuhan untuk diri sendiri atau orang tua. Tim membantu memetakan program, kesiapan dana, dan pertanyaan penting tanpa kewajiban langsung mendaftar.",
  },
  {
    icon: WalletCards,
    title: "Setoran awal USD 1.000",
    short: "Langkah awal yang terukur",
    description:
      "Setoran awal menjadi bagian dari skema DP Haji Khusus. Nilai rupiahnya mengikuti kurs dan pembayaran dikonfirmasi melalui rekening resmi perusahaan.",
  },
  {
    icon: CalendarClock,
    title: "Menyelesaikan sisa DP sesuai tenor",
    short: "Sesuaikan dengan kesiapan",
    description:
      "Sisa DP dapat direncanakan melalui pilihan tenor yang tersedia. Gunakan simulator untuk melihat estimasi setoran, lalu konfirmasikan skema resminya kepada konsultan.",
  },
  {
    icon: FileCheck2,
    title: "Pemenuhan dokumen dan persyaratan",
    short: "Dokumen dipersiapkan bertahap",
    description:
      "Tim menjelaskan dokumen dan persyaratan yang perlu disiapkan agar proses administrasi lebih rapi, mudah diperiksa, dan tidak dilakukan terburu-buru.",
  },
  {
    icon: BadgeCheck,
    title: "Proses porsi sesuai ketentuan",
    short: "Diproses setelah syarat terpenuhi",
    description:
      "Proses porsi dijalankan setelah persyaratan dan ketentuan pembayaran terpenuhi. Waktu serta status proses tetap perlu dikonfirmasi berdasarkan ketentuan yang berlaku.",
  },
  {
    icon: PlaneTakeoff,
    title: "Pendampingan menuju keberangkatan",
    short: "Tidak berhenti setelah administrasi",
    description:
      "Pendampingan berlanjut pada persiapan, informasi perjalanan, manasik, dan kebutuhan jamaah menjelang keberangkatan sesuai layanan program.",
  },
] as const;

const TOTAL_STEPS = JOURNEY_STEPS.length;

export default function JourneyStory() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reducedMotion.matches) root.setAttribute("data-enhanced", "true");
    const stepElements = Array.from(root.querySelectorAll<HTMLElement>("[data-journey-step]"));
    let observer: IntersectionObserver | null = null;
    let animationFrame = 0;

    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      stepElements.forEach((element) => element.setAttribute("data-observed", "true"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          const focused = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!focused) return;
          const nextIndex = Number((focused.target as HTMLElement).dataset.journeyStep ?? 0);
          setActiveStep((current) => (current === nextIndex ? current : nextIndex));
        },
        {
          rootMargin: "-38% 0px -38% 0px",
          threshold: [0.01, 0.15, 0.4],
        },
      );

      stepElements.forEach((element) => observer?.observe(element));
    }

    const updateScrollProgress = () => {
      animationFrame = 0;
      const rect = root.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      root.style.setProperty("--journey-progress", `${progress * 100}%`);
      root.style.setProperty("--journey-shift", `${progress * 34}px`);
      root.style.setProperty("--journey-rotate", `${progress * 18}deg`);
    };

    const onScroll = () => {
      if (animationFrame || reducedMotion.matches) return;
      animationFrame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.removeAttribute("data-enhanced");
    };
  }, []);

  const ActiveIcon = JOURNEY_STEPS[activeStep].icon;
  const progress = ((activeStep + 1) / TOTAL_STEPS) * 100;

  return (
    <section
      ref={rootRef}
      id="skema"
      className="journey-story"
      aria-labelledby="journey-heading"
      style={
        {
          "--journey-progress": "0%",
          "--journey-shift": "0px",
          "--journey-rotate": "0deg",
        } as CSSProperties
      }
    >
      <div aria-hidden className="journey-story__glow journey-story__glow--one" />
      <div aria-hidden className="journey-story__glow journey-story__glow--two" />

      <div className="shell journey-story__shell">
        <header data-fx className="journey-story__header">
          <p className="journey-story__eyebrow">Perjalanan mendapatkan porsi</p>
          <h2 id="journey-heading">Enam langkah yang dijelaskan secara bertahap.</h2>
          <p>
            Setiap proses memiliki urutan dan ketentuan. Scroll untuk memahami gambaran perjalanannya tanpa harus
            menghafal semuanya sekaligus.
          </p>
        </header>

        <div className="journey-story__layout">
          <div className="journey-story__steps" role="list" aria-label="Tahapan mendapatkan porsi Haji Khusus">
            {JOURNEY_STEPS.map(({ icon: Icon, title, short, description }, index) => {
              const isActive = activeStep === index;
              return (
                <article
                  key={title}
                  data-journey-step={index}
                  data-active={isActive ? "true" : "false"}
                  className="journey-story__step"
                  role="listitem"
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="journey-story__step-card">
                    <div className="journey-story__step-topline">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Icon size={21} strokeWidth={1.7} aria-hidden />
                    </div>
                    <p className="journey-story__step-kicker">{short}</p>
                    <h3>{title}</h3>
                    <p className="journey-story__step-description">{description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="journey-story__stage-wrap" aria-hidden="true">
            <div className="journey-story__stage" data-slot={`journey-step-${String(activeStep + 1).padStart(2, "0")}`}>
              <div className="journey-story__stage-grain" />
              <div className="journey-story__stage-orbit journey-story__stage-orbit--one" />
              <div className="journey-story__stage-orbit journey-story__stage-orbit--two" />

              <div className="journey-story__stage-head">
                <span>Perjalanan porsi</span>
                <strong>
                  {String(activeStep + 1).padStart(2, "0")} <i>/ {String(TOTAL_STEPS).padStart(2, "0")}</i>
                </strong>
              </div>

              <div className="journey-story__visual">
                <div className="journey-story__visual-halo" />
                <div key={activeStep} className="journey-story__visual-icon">
                  <ActiveIcon size={52} strokeWidth={1.35} />
                </div>
                <div key={`copy-${activeStep}`} className="journey-story__visual-copy">
                  <span>{JOURNEY_STEPS[activeStep].short}</span>
                  <strong>{JOURNEY_STEPS[activeStep].title}</strong>
                </div>
              </div>

              <div className="journey-story__route">
                <div className="journey-story__route-base" />
                <div className="journey-story__route-progress" style={{ width: `${progress}%` }} />
                {JOURNEY_STEPS.map((step, index) => (
                  <span
                    key={step.title}
                    className="journey-story__route-node"
                    data-passed={index <= activeStep ? "true" : "false"}
                    style={{ left: `${(index / (TOTAL_STEPS - 1)) * 100}%` }}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>

              <div className="journey-story__stage-foot">
                <span>Geser halaman untuk melanjutkan</span>
                <ArrowRight size={17} strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>

        <div data-fx className="journey-story__closing">
          <div>
            <p>Setiap keluarga dapat memulai dari kondisi yang berbeda.</p>
            <h3>Gunakan simulasi, lalu konfirmasikan skema yang paling sesuai.</h3>
          </div>
          <div className="journey-story__actions">
            <TrackLink
              href="#simulasi"
              event="journey_simulator_click"
              data={{ placement: "journey_story" }}
              className="btn btn-white"
            >
              Coba Simulator <span className="arr" aria-hidden>→</span>
            </TrackLink>
            <WaLink
              message={buildGeneralMessage("journey")}
              event="journey_whatsapp_click"
              data={{ placement: "journey_story" }}
              className="btn journey-story__wa"
            >
              Tanya Prosesnya
            </WaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
