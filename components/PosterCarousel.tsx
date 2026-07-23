"use client";
/** Slide edukasi Diva — poster resmi yang menyambung, scroll-snap native (nol library). */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@/lib/analytics";

const SLIDES = [
  { src: "/poster/p1.webp", alt: "Bertahan di Haji Reguler atau beralih ke Haji Plus", cap: "Bertahan atau beralih?" },
  { src: "/poster/p2.webp", alt: "Alokasi kuota nomor porsi Haji Reguler dan Haji Plus berbeda dari Kemenhaj", cap: "Kuota porsinya memang berbeda" },
  { src: "/poster/p3.webp", alt: "Dua pilihan: mundur dari antrean reguler atau tetap menunggu sambil daftar Haji Plus", cap: "Ada dua pilihan" },
  { src: "/poster/p4.webp", alt: "Fasilitas Haji Plus 2026 Diva: masa tunggu 5-9 tahun, Jabal Omar Marriott, Taiba Front, Etihad", cap: "Fasilitas Haji Plus 2026" },
  { src: "/poster/p5.webp", alt: "Saatnya Haji di usia muda bersama Diva, harga mulai 200 jutaan", cap: "Saatnya haji di usia muda" },
];

export default function PosterCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const compute = () => {
      raf.current = 0;
      const center = root.scrollLeft + root.clientWidth / 2;
      let best = 0, dist = Infinity;
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

  const goTo = (i: number) => {
    (scroller.current?.children[i] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    track("poster_slide_changed", { index: i });
  };

  /* Drag mouse (laptop) — snap dimatikan sementara agar geser terasa bebas. */
  const drag = useRef({ on: false, moved: 0, x: 0, left: 0 });
  const activeRef = useRef(active);
  activeRef.current = active;

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

  return (
    <div>
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Slide edukasi Haji Khusus Diva"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(Math.min(SLIDES.length - 1, active + 1)); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(Math.max(0, active - 1)); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="drag-x no-scrollbar flex select-none snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scroll-padding-inline:max(calc(50%-150px),8vw)] [padding-inline:max(calc(50%-150px),8vw)]"
      >
        {SLIDES.map((s, i) => (
          <figure
            key={s.src}
            className={`vcard w-[80%] max-w-[300px] shrink-0 snap-center sm:w-[292px] ${i === active ? "z-10 scale-[1.03] opacity-100" : "scale-[.9] opacity-70"}`}
          >
            <div className={`overflow-hidden rounded-[26px] border border-white/40 bg-white transition-shadow duration-500 ${i === active ? "shadow-[0_26px_60px_-26px_rgba(92,8,16,.55)]" : "shadow-none"}`}>
              <Image src={s.src} alt={s.alt} width={760} height={950} sizes="(max-width: 640px) 80vw, 292px" className="h-auto w-full" draggable={false} />
            </div>
            <figcaption className={`mt-3 text-center text-[13px] font-semibold transition-colors ${i === active ? "text-red-deep" : "text-ink-2"}`}>{s.cap}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button onClick={() => goTo(Math.max(0, active - 1))} aria-label="Slide sebelumnya"
          className="grid h-11 w-11 place-items-center rounded-full border border-red/20 bg-white text-red shadow-card transition-colors hover:border-red hover:bg-red hover:text-white"><ChevronLeft size={18} /></button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Indikator slide">
          {SLIDES.map((s, i) => (
            <button key={s.src} role="tab" aria-selected={i === active} aria-label={`Ke slide ${i + 1}`} onClick={() => goTo(i)}
              className={`h-[3px] rounded-full transition-all duration-300 ${i === active ? "w-8 bg-red-deep" : "w-4 bg-red/25"}`} />
          ))}
        </div>
        <button onClick={() => goTo(Math.min(SLIDES.length - 1, active + 1))} aria-label="Slide berikutnya"
          className="grid h-11 w-11 place-items-center rounded-full border border-red/20 bg-white text-red shadow-card transition-colors hover:border-red hover:bg-red hover:text-white"><ChevronRight size={18} /></button>
      </div>
      <p className="mt-3 text-center text-[12px] font-medium text-red-deep/70">Geser atau tarik kartu untuk membaca selengkapnya →</p>
    </div>
  );
}
