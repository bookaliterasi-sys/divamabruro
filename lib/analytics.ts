/** Event analytics Diva Mabruro → GTM dataLayer + Meta Pixel (jika terpasang). */
export type EventName =
  | "page_view"
  | "hero_cta_click"
  | "simulation_started"
  | "simulation_tenor_selected"
  | "simulation_whatsapp_click"
  | "haji_package_whatsapp_click"
  | "parent_consultation_click"
  | "video_played"
  | "video_slide_changed"
  | "age_calculator_used"
  | "age_calculator_whatsapp_click"
  | "poster_slide_changed"
  | "faq_opened"
  | "whatsapp_redirect"
  | "contact_clicked";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(name: EventName, data: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event: name, ...data });
    window.fbq?.("trackCustom", name, data);
  } catch {
    /* analytics tidak boleh mematahkan UI */
  }
}
