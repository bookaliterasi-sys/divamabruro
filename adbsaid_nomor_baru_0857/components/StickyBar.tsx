"use client";
/** Sticky conversion bar mobile — muncul setelah hero (IntersectionObserver tunggal). */
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import TrackLink from "@/components/TrackLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 pt-2.5 shadow-[0_-8px_24px_-16px_rgba(24,24,24,.25)] transition-transform duration-500 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 10px)" }}
    >
      <div className="grid grid-cols-2 gap-2">
        <TrackLink href="#simulasi" event="hero_cta_click" data={{ placement: "sticky_mobile", cta: "simulasi" }} className="btn btn-outline !min-h-[46px]">
          Hitung Simulasi
        </TrackLink>
        <WaLink message={buildGeneralMessage("sticky_mobile")} data={{ placement: "sticky_mobile" }} className="btn btn-red !min-h-[46px]">
          <MessageCircle size={16} aria-hidden /> Konsultasi
        </WaLink>
      </div>
    </div>
  );
}
