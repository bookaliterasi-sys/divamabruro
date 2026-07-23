"use client";
/** Tautan WhatsApp terpusat: pesan spesifik + UTM + tracking, satu nomor dari env. */
import type { ReactNode } from "react";
import { waLink } from "@/lib/wa";
import { readUtm, utmLine } from "@/lib/whatsapp";
import { track, type EventName } from "@/lib/analytics";

export default function WaLink({
  message, event = "whatsapp_redirect", data, className, children, ariaLabel,
}: {
  message: string;
  event?: EventName;
  data?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    track(event, data);
    if (event !== "whatsapp_redirect") track("whatsapp_redirect", data);
    window.open(waLink(message + utmLine(readUtm())), "_blank", "noopener,noreferrer");
  };
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
