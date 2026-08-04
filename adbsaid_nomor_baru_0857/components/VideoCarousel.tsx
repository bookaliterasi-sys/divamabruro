"use client";
/**
 * DINDING VIDEO CINEMATIC DIVA — galeri dokumentasi eksklusif.
 * Kartu berdampingan nyaris tanpa jarak, video aktif maju ke tengah.
 * Native scroll + snap, drag desktop, keyboard, klik kartu samping → ke tengah.
 * Deteksi kartu aktif via rAF-throttled scroll (satu listener pasif) — nol jank.
 * Hanya video aktif ±1 yang me-mount <video> (preload none); sisanya poster WebP.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { track } from "@/lib/analytics";

const VIDEOS = [
  { id: "manasik", badge: "Manasik", title: "Manasik praktik Haji Diva — rangkaian tuntas & lancar" },
  { id: "keberangkatan", badge: "Keberangkatan", title: "Keberangkatan Haji Diva 2026 · Kloter 2" },
  { id: "makkah", badge: "Makkah", title: "Gelombang 1A & 1B menuju Makkah — umrah pertama" },
  { id: "raudhah", badge: "Madinah", title: "Ziarah Raudhah & salam di makam Rasulullah ﷺ" },
  { id: "thaif", badge: "Perjalanan", title: "Kebahagiaan jamaah menyusuri Kota Thaif" },
] as const;

export default function VideoCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const vids = useRef<Map<string, HTMLVideoElement>>(new Map());
  const playedOnce = useRef<Set<string>>(new Set());
  const firstEmit = useRef(true);
  const raf = useRef(0);
  const drag = useRef({ on: false, moved: 0, x: 0, left: 0 });
  const [active, setActive] = useState(Math.floor(VIDEOS.length / 2));
  const [playing, setPlaying] = useState<string | null>(null);

  /* Kartu aktif = terdekat dengan pusat — satu scroll listener pasif + rAF. */
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    /* Mulai dari tengah — video ke-3 berada di pusat sejak awal. */
    const mid = root.children[Math.floor(VIDEOS.length / 2)] as HTMLElement | undefined;
    if (mid) root.scrollLeft = mid.offsetLeft - (root.clientWidth - mid.offsetWidth) / 2;
    const compute = () => {
      raf.current = 0;
      const center = root.scrollLeft + root.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      Array.from(root.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (d < dist) { dist = d; best = i; }
      });
      setActive((a) => (a === best ? a : best));
    };
    compute();
    const onScroll = () => { if (!raf.current) raf.current = requestAnimationFrame(compute); };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => { root.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  /* Pause video yang bukan aktif + saat section keluar viewport. */
  useEffect(() => {
    vids.current.forEach((v, id) => { if (id !== VIDEOS[active].id && !v.paused) v.pause(); });
    if (firstEmit.current) { firstEmit.current = false; return; }
    track("video_slide_changed", { index: active, id: VIDEOS[active].id });
  }, [active]);
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) vids.current.forEach((v) => { if (!v.paused) v.pause(); });
    }, { threshold: 0 });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const play = (id: string) => {
    const v = vids.current.get(id);
    if (!v) return;
    vids.current.forEach((o, key) => { if (key !== id && !o.paused) o.pause(); });
    setPlaying(id);
    v.play().catch(() => {});
    if (!playedOnce.current.has(id)) {
      playedOnce.current.add(id);
      track("video_played", { id });
    }
  };

  /* Drag mouse (desktop) — ringan, snap dimatikan sementara saat drag. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const root = scroller.current!;
    drag.current = { on: true, moved: 0, x: e.clientX, left: root.scrollLeft };
    root.classList.add("dragging");
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    scroller.current!.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    scroller.current!.classList.remove("dragging");
    goTo(activeRef.current);
  };
  const activeRef = useRef(active);
  activeRef.current = active;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(Math.min(VIDEOS.length - 1, active + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(Math.max(0, active - 1)); }
  };

  return (
    <section id="video" className="relative overflow-hidden bg-[radial-gradient(135%_125%_at_50%_-12%,#B0121D_0%,#7E0B13_38%,#4A0710_70%,#2A0407_100%)] text-white">
      <div aria-hidden className="wave-top"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#FDE7EA" /></svg></div>
      <div aria-hidden className="wave-bottom"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-10 w-full sm:h-16"><path d="M0 0 H1440 V18 C 1080 72, 360 72, 0 18 Z" fill="#FFF4EC" /></svg></div>
      <div className="shell pt-16 sm:pt-24">
        <div data-fx className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="kicker kicker-light">Perjalanan Nyata Bersama Diva</p>
            <h2 className="h-display mt-3 max-w-xl text-3xl !text-white sm:text-4xl">
              Dari manasik hingga pengalaman beribadah di Tanah Suci
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <p className="font-display text-xl font-bold tabular-nums" aria-live="polite">
              {String(active + 1).padStart(2, "0")} <span className="text-white/50">/ {String(VIDEOS.length).padStart(2, "0")}</span>
            </p>
            <div className="hidden gap-2 sm:flex">
              <button onClick={() => goTo(Math.max(0, active - 1))} aria-label="Video sebelumnya"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"><ChevronLeft size={20} /></button>
              <button onClick={() => goTo(Math.min(VIDEOS.length - 1, active + 1))} aria-label="Video berikutnya"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        role="region"
        aria-label="Galeri video jamaah Diva — gunakan panah kiri/kanan"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="drag-cursor cine-pad no-scrollbar mt-8 flex snap-x snap-mandatory gap-1.5 overflow-x-auto pb-3 pt-2 select-none lg:[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {VIDEOS.map((v, i) => {
          const isActive = i === active;
          const near = Math.abs(i - active) <= 1;
          return (
            <div
              key={v.id}
              data-on={isActive}
              className={`vcard w-[84%] max-w-[320px] shrink-0 snap-center sm:w-[340px] ${isActive ? "z-10 scale-[1.03] opacity-100" : "scale-[.9] opacity-70"}`}
            >
              <div className={`relative aspect-[9/16] overflow-hidden rounded-2xl bg-black/40 ${isActive ? "shadow-[0_24px_60px_-24px_rgba(0,0,0,.65)]" : ""}`}>
                {near ? (
                  <video
                    ref={(el) => { if (el) vids.current.set(v.id, el); }}
                    src={`/videos/${v.id}.mp4`}
                    poster={`/videos/${v.id}.webp`}
                    preload="none"
                    playsInline
                    controls={playing === v.id}
                    onPause={() => setPlaying((p) => (p === v.id ? null : p))}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image src={`/videos/${v.id}.webp`} alt={v.title} fill sizes="(max-width: 640px) 84vw, 340px" className="object-cover" />
                )}
                <span className="vdim" aria-hidden />

                {playing !== v.id && (
                  <button
                    onClick={() => { if (drag.current.moved > 8) return; if (!isActive) { goTo(i); return; } play(v.id); }}
                    aria-label={isActive ? `Putar video: ${v.title}` : `Pilih video: ${v.title}`}
                    className="absolute inset-0 z-10 text-left"
                  >
                    <span className="badge-red absolute left-3.5 top-3.5">{v.badge}</span>
                    {isActive && (
                      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-red shadow-soft transition-transform duration-300 hover:scale-105">
                        <Play size={24} fill="currentColor" aria-hidden className="ml-1" />
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-4 pt-12">
                      <span className="block text-sm font-bold leading-snug text-white">{v.title}</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shell pb-16 sm:pb-20">
        <p className="mt-1 text-center text-[12px] text-white/60 sm:hidden">Geser untuk melihat perjalanan lainnya →</p>
        <div className="mt-4 flex items-center justify-center gap-1.5" role="tablist" aria-label="Indikator video">
          {VIDEOS.map((v, i) => (
            <button key={v.id} role="tab" aria-selected={i === active} aria-label={`Ke video ${i + 1}: ${v.title}`} onClick={() => goTo(i)}
              className={`h-[3px] rounded-full transition-all duration-300 ${i === active ? "w-10 bg-white" : "w-6 bg-white/30"}`} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="https://instagram.com/divaumrohhaji" target="_blank" rel="noopener noreferrer"
            onClick={() => track("contact_clicked", { channel: "instagram" })} className="btn btn-ghost-white">
            Lihat Dokumentasi Selanjutnya <span className="arr" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
