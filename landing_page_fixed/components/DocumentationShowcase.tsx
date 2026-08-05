"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Film, Images, Instagram, Play } from "lucide-react";
import { track } from "@/lib/analytics";

type Category = "video" | "poster";

type MediaItem = {
  id: string;
  category: Category;
  badge: string;
  title: string;
  caption: string;
  src: string;
  poster?: string;
  alt: string;
};

const VIDEO_ITEMS: MediaItem[] = [
  {
    id: "manasik",
    category: "video",
    badge: "Manasik",
    title: "Persiapan ibadah melalui manasik praktik",
    caption: "Cuplikan kegiatan manasik jamaah Diva sebelum keberangkatan.",
    src: "/videos/manasik.mp4",
    poster: "/videos/manasik.webp",
    alt: "Dokumentasi manasik praktik jamaah Diva Mabruro",
  },
  {
    id: "keberangkatan",
    category: "video",
    badge: "Keberangkatan",
    title: "Momen jamaah memulai perjalanan menuju Tanah Suci",
    caption: "Dokumentasi keberangkatan jamaah Haji Diva tahun 2026.",
    src: "/videos/keberangkatan.mp4",
    poster: "/videos/keberangkatan.webp",
    alt: "Dokumentasi keberangkatan jamaah Haji Diva",
  },
  {
    id: "makkah",
    category: "video",
    badge: "Makkah",
    title: "Perjalanan jamaah menuju Makkah dan umrah pertama",
    caption: "Cuplikan rangkaian perjalanan jamaah ketika memasuki fase ibadah di Makkah.",
    src: "/videos/makkah.mp4",
    poster: "/videos/makkah.webp",
    alt: "Dokumentasi perjalanan jamaah Diva menuju Makkah",
  },
  {
    id: "raudhah",
    category: "video",
    badge: "Madinah",
    title: "Ziarah Raudhah dan rangkaian ibadah di Madinah",
    caption: "Dokumentasi jamaah saat menjalani agenda ibadah dan ziarah di Madinah.",
    src: "/videos/raudhah.mp4",
    poster: "/videos/raudhah.webp",
    alt: "Dokumentasi jamaah Diva di Raudhah Madinah",
  },
  {
    id: "thaif",
    category: "video",
    badge: "Perjalanan",
    title: "Kebersamaan jamaah dalam perjalanan menuju Kota Thaif",
    caption: "Cuplikan pengalaman jamaah menikmati salah satu rangkaian perjalanan bersama Diva.",
    src: "/videos/thaif.mp4",
    poster: "/videos/thaif.webp",
    alt: "Dokumentasi perjalanan jamaah Diva di Kota Thaif",
  },
];

const POSTER_ITEMS: MediaItem[] = [
  {
    id: "poster-pilihan",
    category: "poster",
    badge: "Edukasi",
    title: "Bertahan di Haji Reguler atau beralih ke Haji Plus?",
    caption: "Materi singkat untuk membantu keluarga memahami pilihan sebelum mengambil keputusan.",
    src: "/poster/p1.webp",
    alt: "Poster edukasi bertahan di Haji Reguler atau beralih ke Haji Plus",
  },
  {
    id: "poster-kuota",
    category: "poster",
    badge: "Porsi",
    title: "Memahami perbedaan alokasi kuota dan nomor porsi",
    caption: "Ringkasan visual mengenai perbedaan jalur porsi Haji Reguler dan Haji Plus.",
    src: "/poster/p2.webp",
    alt: "Poster edukasi alokasi kuota nomor porsi Haji Reguler dan Haji Plus",
  },
  {
    id: "poster-dua-pilihan",
    category: "poster",
    badge: "Perencanaan",
    title: "Dua pilihan yang dapat dipertimbangkan oleh calon jamaah",
    caption: "Materi edukasi untuk membaca alternatif rencana secara lebih tenang.",
    src: "/poster/p3.webp",
    alt: "Poster edukasi dua pilihan rencana Haji Reguler dan Haji Plus",
  },
  {
    id: "poster-fasilitas",
    category: "poster",
    badge: "Program",
    title: "Gambaran fasilitas program Haji Plus Diva",
    caption: "Ringkasan fasilitas berdasarkan materi program yang tersedia di proyek.",
    src: "/poster/p4.webp",
    alt: "Poster fasilitas Haji Plus Diva",
  },
  {
    id: "poster-usia-muda",
    category: "poster",
    badge: "Inspirasi",
    title: "Mulai merencanakan Haji sejak usia lebih muda",
    caption: "Materi ajakan untuk menyiapkan perjalanan ibadah lebih awal dan lebih terarah.",
    src: "/poster/p5.webp",
    alt: "Poster ajakan merencanakan Haji di usia muda bersama Diva",
  },
  {
    id: "poster-rute",
    category: "poster",
    badge: "Rute Ibadah",
    title: "Dua belas tahapan perjalanan ibadah Haji bersama Diva",
    caption: "Infografis rute mulai dari kedatangan, Madinah, Makkah, rangkaian puncak Haji, hingga kembali ke tanah air.",
    src: "/poster/rute.webp",
    alt: "Infografis dua belas tahapan rute perjalanan ibadah Haji bersama Diva",
  },
];

function FeaturedMedia({ item }: { item: MediaItem }) {
  if (item.category === "video") {
    return (
      <div className="documentation-feature__canvas documentation-feature__canvas--video">
        <Image
          src={item.poster ?? item.src}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 720px"
          className="documentation-feature__backdrop"
          aria-hidden
        />
        <div className="documentation-feature__shade" aria-hidden />
        <video
          key={item.id}
          src={item.src}
          poster={item.poster}
          preload="none"
          playsInline
          controls
          onPlay={() => track("video_played", { id: item.id, placement: "documentation_feature" })}
          className="documentation-feature__video"
          aria-label={item.alt}
        />
      </div>
    );
  }

  return (
    <div className="documentation-feature__canvas documentation-feature__canvas--poster">
      <div className="documentation-feature__poster-frame">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 82vw, 480px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function MobileMedia({ item }: { item: MediaItem }) {
  if (item.category === "video") {
    return (
      <div className="documentation-mobile-card__media documentation-mobile-card__media--video">
        <video
          src={item.src}
          poster={item.poster}
          preload="none"
          playsInline
          controls
          onPlay={() => track("video_played", { id: item.id, placement: "documentation_mobile" })}
          className="h-full w-full object-cover"
          aria-label={item.alt}
        />
      </div>
    );
  }

  return (
    <div className="documentation-mobile-card__media documentation-mobile-card__media--poster">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        sizes="84vw"
        className="object-contain"
      />
    </div>
  );
}

export default function DocumentationShowcase() {
  const [category, setCategory] = useState<Category>("video");
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const firstActiveEvent = useRef(true);

  const items = useMemo(() => (category === "video" ? VIDEO_ITEMS : POSTER_ITEMS), [category]);
  const activeItem = items[active] ?? items[0];

  useEffect(() => {
    setActive(0);
    firstActiveEvent.current = true;
    if (scroller.current) scroller.current.scrollLeft = 0;
  }, [category]);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;

    const compute = () => {
      raf.current = 0;
      const center = root.scrollLeft + root.clientWidth / 2;
      let best = 0;
      let distance = Number.POSITIVE_INFINITY;

      Array.from(root.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const nextDistance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (nextDistance < distance) {
          distance = nextDistance;
          best = index;
        }
      });

      setActive((current) => (current === best ? current : best));
    };

    compute();
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(compute);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [category]);

  useEffect(() => {
    if (firstActiveEvent.current) {
      firstActiveEvent.current = false;
      return;
    }

    track("documentation_interaction", {
      action: "media_changed",
      category,
      index: active,
      id: activeItem.id,
    });

    if (category === "video") {
      track("video_slide_changed", { index: active, id: activeItem.id });
    } else {
      track("poster_slide_changed", { index: active, id: activeItem.id });
    }
  }, [active, activeItem.id, category]);

  const changeCategory = (nextCategory: Category) => {
    if (nextCategory === category) return;
    setCategory(nextCategory);
    track("documentation_interaction", { action: "category_changed", category: nextCategory });
  };

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    const item = scroller.current?.children[nextIndex] as HTMLElement | undefined;
    item?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(nextIndex);
  };

  return (
    <section id="dokumentasi" className="documentation-showcase" aria-labelledby="documentation-heading">
      <div aria-hidden className="documentation-showcase__glow documentation-showcase__glow--one" />
      <div aria-hidden className="documentation-showcase__glow documentation-showcase__glow--two" />

      <div className="shell relative">
        <div data-fx className="documentation-showcase__header">
          <div>
            <p className="kicker kicker-light">Dokumentasi Diva Mabruro</p>
            <h2 id="documentation-heading" className="h-display mt-3 max-w-3xl text-3xl !text-white sm:text-4xl lg:text-5xl">
              Lihat perjalanan nyata dan materi yang membantu Anda memahami program.
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/72">
              Pilih video perjalanan atau poster edukasi. Seluruh media menggunakan dokumentasi yang sudah tersedia di proyek ini.
            </p>
          </div>

          <div className="documentation-showcase__category" role="tablist" aria-label="Kategori dokumentasi">
            <button
              type="button"
              role="tab"
              aria-selected={category === "video"}
              data-active={category === "video"}
              onClick={() => changeCategory("video")}
            >
              <Film size={17} aria-hidden /> Video <span>{VIDEO_ITEMS.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === "poster"}
              data-active={category === "poster"}
              onClick={() => changeCategory("poster")}
            >
              <Images size={17} aria-hidden /> Poster <span>{POSTER_ITEMS.length}</span>
            </button>
          </div>
        </div>

        <div data-fx className="documentation-feature" style={{ "--d": ".08s" } as React.CSSProperties}>
          <div className="documentation-feature__media">
            <FeaturedMedia item={activeItem} />
          </div>

          <div className="documentation-feature__copy">
            <div className="flex items-center justify-between gap-4">
              <span className="documentation-feature__badge">{activeItem.badge}</span>
              <p className="documentation-feature__count" aria-live="polite">
                {String(active + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span>
              </p>
            </div>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.caption}</p>

            <div className="documentation-feature__rule" aria-hidden />
            <p className="documentation-feature__note">
              {category === "video"
                ? "Tekan tombol putar pada media utama. Video dimuat hanya ketika dibutuhkan agar halaman tetap ringan."
                : "Poster ditampilkan dalam rasio 4:5 yang konsisten. Infografis rute tetap utuh dengan mode contain."}
            </p>

            <div className="documentation-feature__controls">
              <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Dokumentasi sebelumnya">
                <ChevronLeft size={20} aria-hidden />
              </button>
              <button type="button" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label="Dokumentasi berikutnya">
                <ChevronRight size={20} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div data-fx className="documentation-rail-wrap" style={{ "--d": ".12s" } as React.CSSProperties}>
        <div
          ref={scroller}
          className="documentation-rail no-scrollbar"
          role="region"
          aria-label={`${category === "video" ? "Video perjalanan" : "Poster edukasi"} Diva Mabruro`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(active + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(active - 1);
            }
          }}
        >
          {items.map((item, index) => (
            <article
              key={item.id}
              className="documentation-rail__item"
              data-active={index === active}
              aria-current={index === active ? "true" : undefined}
            >
              <div className="documentation-rail__mobile-media">
                <MobileMedia item={item} />
              </div>

              <button
                type="button"
                className="documentation-rail__desktop-thumb"
                onClick={() => goTo(index)}
                aria-label={`Tampilkan ${item.title}`}
              >
                <div className={`documentation-rail__thumb-media ${item.category === "poster" ? "is-poster" : "is-video"}`}>
                  <Image
                    src={item.poster ?? item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="220px"
                    className={item.category === "poster" ? "object-contain bg-white" : "object-cover"}
                  />
                  {item.category === "video" ? (
                    <span className="documentation-rail__play" aria-hidden>
                      <Play size={17} fill="currentColor" />
                    </span>
                  ) : null}
                </div>
                <span className="documentation-rail__desktop-label">
                  <small>{item.badge}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>

              <div className="documentation-rail__mobile-caption">
                <div className="flex items-center justify-between gap-3">
                  <span>{item.badge}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell relative pb-20 pt-6 sm:pb-28 sm:pt-8">
        <div className="documentation-showcase__footer">
          <p>Geser media pada handphone atau gunakan tombol panah pada laptop.</p>
          <a
            href="https://instagram.com/divaumrohhaji"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_clicked", { channel: "instagram", placement: "documentation" })}
            className="btn btn-ghost-white"
          >
            <Instagram size={17} aria-hidden /> Lihat Dokumentasi Lainnya
          </a>
        </div>
      </div>
    </section>
  );
}
