"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const NAV = [
  ["#skema", "Skema Porsi"],
  ["#simulasi", "Simulasi"],
  ["#program", "Program"],
  ["#dokumentasi", "Dokumentasi"],
  ["#pendampingan-jamaah", "Pendampingan"],
  ["#faq", "FAQ"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[82px] bg-transparent sm:h-[92px]">
      {open && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-0 bg-red-wine/20 backdrop-blur-[2px] lg:hidden"
          onClick={closeMenu}
        />
      )}

      <div className="shell relative z-10 flex h-full items-center">
        <div
          className={`relative flex h-[62px] w-full items-center justify-between rounded-[22px] px-3 transition-[background-color,border-color,box-shadow,transform] duration-500 sm:h-[68px] sm:px-4 ${
            scrolled || open
              ? "translate-y-0 border border-white/70 bg-white/80 shadow-[0_18px_50px_-28px_rgba(92,8,16,.55)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a
            href="#hero"
            aria-label="Diva Mabruro — kembali ke bagian awal"
            className="group flex min-w-0 items-center gap-2.5 rounded-xl"
            onClick={closeMenu}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] border border-white/70 bg-white/75 shadow-[0_10px_25px_-18px_rgba(92,8,16,.65)] backdrop-blur-md sm:h-12 sm:w-12">
              <Image
                src="/brand/diva-t.png"
                alt="Logo Diva Mabruro"
                width={48}
                height={48}
                priority
                className="logo-anim h-10 w-10 object-contain sm:h-11 sm:w-11"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[19px] font-bold text-ink sm:text-xl">Diva Mabruro</span>
              <span className="block truncate text-[9px] font-bold uppercase tracking-[0.19em] text-red sm:text-[10px] sm:tracking-[0.22em]">
                Umrah &amp; Haji Plus
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 text-[13px] font-bold text-ink-2 transition-colors hover:bg-white/75 hover:text-red xl:px-3.5 xl:text-sm"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <WaLink
              message={buildGeneralMessage("header")}
              data={{ placement: "header" }}
              className="btn btn-red !min-h-[44px] !rounded-[15px] !px-4 xl:!px-5"
              ariaLabel="Konsultasi via WhatsApp Diva Mabruro"
            >
              <MessageCircle size={17} aria-hidden />
              <span>Konsultasi via WhatsApp</span>
            </WaLink>
          </div>

          <button
            type="button"
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-[15px] border transition-colors lg:hidden ${
              open ? "border-red bg-red text-white" : "border-red/15 bg-white/75 text-ink backdrop-blur-md"
            }`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav
            id="mobile-navigation"
            aria-label="Navigasi mobile"
            className={`absolute inset-x-0 top-[calc(100%+10px)] origin-top overflow-hidden rounded-[24px] border border-white/80 bg-white/95 p-3 shadow-[0_26px_70px_-30px_rgba(59,4,10,.65)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 lg:hidden ${
              open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[.98] opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="flex min-h-[52px] items-center rounded-[16px] border border-line/70 bg-off/75 px-4 text-[14px] font-bold text-ink transition-colors active:bg-red-soft active:text-red"
                >
                  {label}
                </a>
              ))}
            </div>
            <WaLink
              message={buildGeneralMessage("mobile_menu")}
              data={{ placement: "mobile_menu" }}
              className="btn btn-red mt-3 w-full !rounded-[17px]"
              ariaLabel="Konsultasi via WhatsApp Diva Mabruro"
            >
              <MessageCircle size={18} aria-hidden /> Konsultasi via WhatsApp
            </WaLink>
            <p className="px-2 pb-1 pt-3 text-center text-[11px] leading-relaxed text-ink-2">
              Konsultasi awal gratis dan tidak mengikat.
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
