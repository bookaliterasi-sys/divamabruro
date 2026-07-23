"use client";
/** Header ringan: sticky murni CSS (tanpa scroll listener), menu mobile satu tangan. */
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const NAV = [
  ["#keunggulan", "Keunggulan"],
  ["#skema", "Skema Porsi"],
  ["#simulasi", "Simulasi"],
  ["#program", "Program Haji"],
  ["#video", "Video Jamaah"],
  ["#faq", "FAQ"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95">
      <div className="shell flex h-[68px] items-center justify-between">
        <a href="#" aria-label="Diva Mabruro — kembali ke atas" className="group flex items-center gap-2.5">
          <Image src="/brand/diva-t.png" alt="Logo Diva Mabruro" width={48} height={48} priority className="logo-anim h-12 w-12 object-contain" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-bold text-ink">Diva Mabruro</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-red">Umrah & Haji Plus</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-semibold text-ink-2 transition-colors hover:text-red">
              {label}
            </a>
          ))}
          <WaLink message={buildGeneralMessage("header")} data={{ placement: "header" }} className="btn btn-red">
            Konsultasi Haji Khusus
          </WaLink>
        </nav>

        <button className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink lg:hidden"
          aria-expanded={open} aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav aria-label="Navigasi mobile" className="fx fx-in absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-line bg-white shadow-card lg:hidden">
          <div className="px-5 pb-6 pt-2">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-3.5 text-[16px] font-semibold text-ink">
                {label}
              </a>
            ))}
            <WaLink message={buildGeneralMessage("mobile_menu")} data={{ placement: "mobile_menu" }} className="btn btn-red mt-4 w-full">
              <MessageCircle size={17} aria-hidden /> Konsultasi Haji Khusus
            </WaLink>
          </div>
        </nav>
      )}
    </header>
  );
}
