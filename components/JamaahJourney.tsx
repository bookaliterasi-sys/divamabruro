import Image from "next/image";
import {
  ClipboardCheck,
  FileText,
  GraduationCap,
  Luggage,
  PlaneTakeoff,
  Route,
  Home,
  MessageCircle,
} from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const STAGES = [
  {
    number: "01",
    title: "Konsultasi",
    eyebrow: "Memahami kebutuhan jamaah",
    description:
      "Perjalanan dimulai dari percakapan sederhana mengenai siapa yang akan berangkat, kebutuhan keluarga, kesiapan waktu, dan hal yang masih ingin dipahami.",
    icon: MessageCircle,
    slot: "jamaah-konsultasi",
  },
  {
    number: "02",
    title: "Administrasi",
    eyebrow: "Menyiapkan data dan dokumen",
    description:
      "Tim membantu menjelaskan dokumen serta persyaratan yang perlu dipenuhi agar proses berikutnya dapat berjalan lebih tertib dan mudah dipantau.",
    icon: FileText,
    slot: "jamaah-administrasi",
  },
  {
    number: "03",
    title: "Manasik",
    eyebrow: "Membangun kesiapan ibadah",
    description:
      "Jamaah mengikuti pembekalan untuk memahami rangkaian ibadah, tata cara, serta hal praktis yang akan ditemui selama perjalanan.",
    icon: GraduationCap,
    image: "/videos/manasik.webp",
    imageAlt: "Dokumentasi kegiatan manasik jamaah Diva Mabruro",
  },
  {
    number: "04",
    title: "Persiapan",
    eyebrow: "Merapikan kebutuhan perjalanan",
    description:
      "Kebutuhan pribadi, perlengkapan, informasi keberangkatan, kesehatan, dan komunikasi keluarga dipersiapkan secara bertahap sebelum hari perjalanan.",
    icon: Luggage,
    slot: "jamaah-persiapan",
  },
  {
    number: "05",
    title: "Keberangkatan",
    eyebrow: "Memulai perjalanan bersama",
    description:
      "Jamaah memperoleh arahan keberangkatan dan pendampingan pada tahapan awal perjalanan agar proses menuju Tanah Suci terasa lebih terorganisir.",
    icon: PlaneTakeoff,
    image: "/videos/keberangkatan.webp",
    imageAlt: "Dokumentasi keberangkatan jamaah Diva Mabruro",
  },
  {
    number: "06",
    title: "Pelaksanaan ibadah",
    eyebrow: "Menjaga fokus dan kenyamanan",
    description:
      "Pendampingan diarahkan untuk membantu jamaah mengikuti rangkaian perjalanan dan ibadah dengan informasi yang jelas serta komunikasi yang tetap tersedia.",
    icon: Route,
    image: "/videos/makkah.webp",
    imageAlt: "Dokumentasi perjalanan ibadah jamaah Diva Mabruro di Makkah",
  },
  {
    number: "07",
    title: "Kepulangan",
    eyebrow: "Kembali kepada keluarga",
    description:
      "Perjalanan ditutup dengan arahan kepulangan dan komunikasi akhir agar jamaah dapat kembali kepada keluarga dengan proses yang tetap tertata.",
    icon: Home,
    slot: "jamaah-kepulangan",
  },
] as const;

export default function JamaahJourney() {
  return (
    <section
      id="pendampingan-jamaah"
      className="jamaah-journey"
      aria-labelledby="jamaah-journey-heading"
    >
      <div aria-hidden className="jamaah-journey__glow jamaah-journey__glow--one" />
      <div aria-hidden className="jamaah-journey__glow jamaah-journey__glow--two" />

      <div className="shell jamaah-journey__shell">
        <header className="jamaah-journey__header">
          <div data-fx>
            <p className="kicker">Pendampingan Jamaah</p>
            <h2 id="jamaah-journey-heading">
              Dari percakapan pertama hingga kembali pulang, setiap tahap dibuat lebih mudah diikuti.
            </h2>
          </div>
          <div data-fx className="jamaah-journey__header-copy" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Pengalaman jamaah bukan hanya tentang hari keberangkatan. Ada rangkaian persiapan, komunikasi,
              pembekalan, dan pendampingan yang perlu tersambung dari awal hingga selesai.
            </p>
          </div>
        </header>

        <div className="jamaah-journey__layout">
          <aside className="jamaah-journey__rail" aria-label="Tahapan pendampingan jamaah">
            <p>Perjalanan jamaah</p>
            <ol>
              {STAGES.map((stage) => (
                <li key={stage.number}>
                  <span>{stage.number}</span>
                  <a href={`#pendampingan-${stage.number}`}>{stage.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="jamaah-journey__scenes">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const hasImage = "image" in stage;

              return (
                <article
                  id={`pendampingan-${stage.number}`}
                  key={stage.number}
                  className="jamaah-journey__scene"
                  style={{ "--scene-index": index } as React.CSSProperties}
                >
                  <div className={`jamaah-journey__frame ${index % 2 === 1 ? "jamaah-journey__frame--reverse" : ""}`}>
                    <figure className="jamaah-journey__media">
                      {hasImage ? (
                        <Image
                          src={stage.image}
                          alt={stage.imageAlt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 58vw, 620px"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="jamaah-journey__placeholder"
                          data-slot={stage.slot}
                          role="img"
                          aria-label={`Placeholder visual untuk tahap ${stage.title}`}
                        />
                      )}
                      {hasImage ? (
                        <>
                          <div aria-hidden className="jamaah-journey__media-shade" />
                          <figcaption>
                            <span>{stage.number}</span>
                            <strong>{stage.title}</strong>
                          </figcaption>
                        </>
                      ) : null}
                    </figure>

                    <div className="jamaah-journey__copy">
                      <div className="jamaah-journey__icon" aria-hidden>
                        <Icon size={22} strokeWidth={1.65} />
                      </div>
                      <p className="jamaah-journey__eyebrow">{stage.eyebrow}</p>
                      <h3>{stage.title}</h3>
                      <p className="jamaah-journey__description">{stage.description}</p>
                      <div className="jamaah-journey__step-line" aria-hidden>
                        <span>{stage.number}</span>
                        <i />
                        <small>{String(STAGES.length).padStart(2, "0")}</small>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div data-fx className="jamaah-journey__closing" style={{ "--d": ".1s" } as React.CSSProperties}>
          <div>
            <p className="jamaah-journey__closing-label">Kebutuhan setiap jamaah dapat berbeda</p>
            <h3>Ceritakan kondisi jamaah agar bentuk pendampingannya dapat dijelaskan sejak awal.</h3>
          </div>
          <div className="jamaah-journey__closing-action">
            <WaLink
              message={buildGeneralMessage("pendampingan")}
              event="parent_consultation_click"
              data={{ placement: "jamaah_journey" }}
              className="btn btn-red"
            >
              Konsultasikan Pendampingan <span className="arr" aria-hidden>→</span>
            </WaLink>
            <p>Konsultasi awal gratis dan tidak mengikat.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
