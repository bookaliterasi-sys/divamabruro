"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleDollarSign,
  FileText,
  MessageCircle,
  PlaneTakeoff,
  Route,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { FAQ_GROUPS, FAQS, type FaqCategoryId } from "@/lib/faq";
import { track } from "@/lib/analytics";

const CATEGORY_ICONS = {
  "skema-porsi": Route,
  pembayaran: WalletCards,
  dokumen: FileText,
  keberangkatan: PlaneTakeoff,
  keamanan: ShieldCheck,
  konsultasi: MessageCircle,
} satisfies Record<FaqCategoryId, typeof Route>;

function FaqCta({ type }: { type: "porsi" | "keamanan" }) {
  const security = type === "keamanan";

  return (
    <aside className="faq-editorial__cta" aria-label={security ? "Konsultasi keamanan pembayaran" : "Konsultasi skema porsi"}>
      <div className="faq-editorial__cta-icon" aria-hidden>
        {security ? <ShieldCheck size={21} /> : <CircleDollarSign size={21} />}
      </div>
      <div>
        <p className="faq-editorial__cta-label">{security ? "Sebelum melakukan pembayaran" : "Masih menghitung skema yang sesuai?"}</p>
        <h3>{security ? "Verifikasi informasi penting langsung dengan konsultan." : "Minta penjelasan berdasarkan rencana keuangan Anda."}</h3>
      </div>
      <WaLink
        message={buildGeneralMessage(security ? "faq_keamanan" : "faq_porsi")}
        event="faq_whatsapp_click"
        data={{ topic: type }}
        className="btn btn-red faq-editorial__cta-button"
      >
        <MessageCircle size={16} aria-hidden /> {security ? "Verifikasi via WhatsApp" : "Tanya Skema Porsi"}
      </WaLink>
    </aside>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section id="faq" className="faq-editorial" aria-labelledby="faq-heading">
      <div aria-hidden className="faq-editorial__glow faq-editorial__glow--one" />
      <div aria-hidden className="faq-editorial__glow faq-editorial__glow--two" />

      <div className="shell faq-editorial__shell">
        <header className="faq-editorial__header">
          <div>
            <p className="kicker">Pertanyaan Umum</p>
            <h2 id="faq-heading">Temukan jawaban berdasarkan tahap yang sedang Anda pertimbangkan.</h2>
          </div>
          <div className="faq-editorial__header-copy">
            <p>
              Pertanyaan dikelompokkan agar skema porsi, pembayaran, dokumen, keberangkatan, keamanan, dan konsultasi
              dapat diperiksa tanpa membaca informasi yang bercampur.
            </p>
            <WaLink
              message={buildGeneralMessage("faq_konsultasi")}
              event="faq_whatsapp_click"
              data={{ topic: "general" }}
              className="faq-editorial__header-link"
            >
              Pertanyaan belum tercantum? Konsultasikan <span aria-hidden>→</span>
            </WaLink>
          </div>
        </header>

        <nav className="faq-editorial__nav no-scrollbar" aria-label="Kategori FAQ">
          {FAQ_GROUPS.map((group, index) => {
            const Icon = CATEGORY_ICONS[group.id];
            return (
              <a key={group.id} href={`#faq-${group.id}`}>
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={15} aria-hidden />
                {group.label}
              </a>
            );
          })}
        </nav>

        <div className="faq-editorial__groups">
          {FAQ_GROUPS.map((group, groupIndex) => {
            const Icon = CATEGORY_ICONS[group.id];
            return (
              <div key={group.id}>
                <section id={`faq-${group.id}`} className="faq-editorial__group" aria-labelledby={`faq-${group.id}-heading`}>
                  <div className="faq-editorial__group-heading">
                    <span className="faq-editorial__group-number" aria-hidden>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <div className="faq-editorial__group-icon" aria-hidden><Icon size={20} /></div>
                    <div>
                      <h3 id={`faq-${group.id}-heading`}>{group.label}</h3>
                      <p>{group.intro}</p>
                    </div>
                  </div>

                  <div className="faq-editorial__questions">
                    {group.items.map((item) => {
                      const isOpen = open === item.id;
                      const panelId = `faq-panel-${item.id}`;
                      const buttonId = `faq-button-${item.id}`;

                      return (
                        <article key={item.id} className="faq-editorial__item" data-open={isOpen}>
                          <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => {
                              setOpen(isOpen ? null : item.id);
                              if (!isOpen) track("faq_opened", { id: item.id, category: group.id, question: item.q });
                            }}
                          >
                            <span>{item.q}</span>
                            <ChevronDown size={19} aria-hidden />
                          </button>
                          <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className="faq-panel"
                            data-open={isOpen}
                          >
                            <div><p>{item.a}</p></div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>

                {group.id === "skema-porsi" ? <FaqCta type="porsi" /> : null}
                {group.id === "keamanan" ? <FaqCta type="keamanan" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
