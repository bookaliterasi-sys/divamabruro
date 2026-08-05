/** Event analytics Diva Mabruro → GTM dataLayer + Meta Pixel (jika terpasang). */
export type EventName =
  | "page_view"
  | "hero_cta_click"
  | "problem_possibility_whatsapp_click"
  | "problem_possibility_simulator_click"
  | "journey_whatsapp_click"
  | "journey_simulator_click"
  | "simulation_started"
  | "simulation_changed"
  | "simulation_tenor_selected"
  | "simulation_whatsapp_click"
  | "haji_package_whatsapp_click"
  | "documentation_interaction"
  | "parent_consultation_click"
  | "legal_whatsapp_click"
  | "video_played"
  | "video_slide_changed"
  | "age_calculator_used"
  | "age_calculator_whatsapp_click"
  | "poster_slide_changed"
  | "faq_opened"
  | "faq_whatsapp_click"
  | "final_whatsapp_click"
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
