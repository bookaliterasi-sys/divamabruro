/** Event analytics Diva Mabruro → GTM + Meta Pixel + Meta CAPI. */
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

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));

  return cookie?.slice(prefix.length);
}

function isWhatsAppEvent(name: EventName): boolean {
  return (
    name === "whatsapp_redirect" ||
    name === "simulation_whatsapp_click" ||
    name === "haji_package_whatsapp_click" ||
    name === "parent_consultation_click" ||
    name === "age_calculator_whatsapp_click" ||
    name === "contact_clicked"
  );
}

export function track(
  name: EventName,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer?.push({ event: name, ...data });
    window.fbq?.("trackCustom", name, data);

    if (!isWhatsAppEvent(name)) return;

    const eventId = crypto.randomUUID();

    window.fbq?.(
      "track",
      "Contact",
      {
        source_event: name,
        ...data,
      },
      {
        eventID: eventId,
      }
    );

    void fetch("/api/meta-capi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        eventName: "Contact",
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      }),
    });
  } catch {
    /* analytics tidak boleh mematahkan UI */
  }
}
