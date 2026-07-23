"use client";
import type { ReactNode } from "react";
import { track, type EventName } from "@/lib/analytics";

export default function TrackLink({
  href, event, data, className, children,
}: { href: string; event: EventName; data?: Record<string, unknown>; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} onClick={() => track(event, data)}>
      {children}
    </a>
  );
}
