"use client";
/** FAQ — jawaban ringkas di awal, accordion ringan, ramah keyboard. */
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { FAQS } from "@/lib/faq";
import { track } from "@/lib/analytics";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="blend relative overflow-hidden bg-[linear-gradient(180deg,#F6C9CE_0%,#FDE3E6_45%,#FFF4EC_100%)] py-16 sm:py-24" style={{ "--blend-top": "#F6C9CE", "--blend-bottom": "#FFF4EC" } as React.CSSProperties}>
      <span aria-hidden className="deco -right-4 top-6 select-none font-display text-[9rem] font-bold leading-none text-red/[0.05]">FAQ</span>
      <div className="shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="kicker">Pertanyaan Umum</p>
          <h2 data-fx className="h-display mt-3 text-3xl sm:text-4xl">Ragu itu wajar. Tanyakan saja.</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
            Ini pertanyaan yang paling sering masuk sebelum orang memutuskan. Jika belum terjawab,
            konsultan kami menjawab langsung.
          </p>
          <WaLink message={buildGeneralMessage("faq")} data={{ placement: "faq" }} className="btn btn-outline mt-6">
            <MessageCircle size={16} aria-hidden /> Bicara dengan Konsultan Diva
          </WaLink>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className={`card overflow-hidden !rounded-2xl transition-colors ${on ? "border-red/50" : ""}`}>
                <button
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={on}
                  onClick={() => { setOpen(on ? null : i); if (!on) track("faq_opened", { q: f.q }); }}
                >
                  <span className={`text-[15px] font-bold ${on ? "text-red" : "text-ink"}`}>{f.q}</span>
                  <ChevronDown size={18} aria-hidden className={`shrink-0 text-red transition-transform duration-300 ${on ? "rotate-180" : ""}`} />
                </button>
                <div className="faq-panel" data-open={on}>
                  <div><p className="px-5 pb-5 text-sm leading-relaxed text-ink-2">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
