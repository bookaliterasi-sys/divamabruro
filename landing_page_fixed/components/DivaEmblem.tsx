/** Emblem logo Diva yang hidup — murni CSS (transform/opacity), aman untuk HP kelas bawah. */
import Image from "next/image";

export default function DivaEmblem({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-t-[9rem] rounded-b-[2rem] bg-[linear-gradient(165deg,#FFFFFF_0%,#FFF4EC_38%,#FDEEF0_70%,#FAD9DD_100%)] shadow-card">
      <span aria-hidden className="emblem-glow absolute h-36 w-36 rounded-full bg-rose/25 blur-2xl sm:h-56 sm:w-56" />
      <span aria-hidden className="emblem-ring absolute h-[12.5rem] w-[12.5rem] rounded-full border border-dashed border-red/25 sm:h-[19rem] sm:w-[19rem]" />
      <span aria-hidden className="absolute h-40 w-40 rounded-full border border-red/10 sm:h-60 sm:w-60" />
      <svg aria-hidden viewBox="0 0 120 120" fill="none" className="absolute left-4 top-4 h-11 w-11 text-red/70 sm:left-6 sm:top-6 sm:h-16 sm:w-16">
        <path d="M14 98 C 8 46, 44 12, 102 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="wing-path" />
      </svg>
      <svg aria-hidden viewBox="0 0 120 120" fill="none" className="absolute bottom-4 right-4 h-11 w-11 rotate-180 text-red/70 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16">
        <path d="M14 98 C 8 46, 44 12, 102 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="wing-path" style={{ animationDelay: ".7s" }} />
      </svg>
      <Image
        src="/brand/diva-t.png"
        alt="Logo Diva Mabruro — Umrah & Haji Plus"
        width={230}
        height={230}
        priority={priority}
        className="logo-float relative h-32 w-32 object-contain drop-shadow-[0_18px_30px_rgba(181,18,27,.28)] sm:h-56 sm:w-56"
      />
    </div>
  );
}
