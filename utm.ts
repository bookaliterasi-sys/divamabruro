export interface Utm {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  landingUrl?: string;
}

const KEY = "dt_utm_v1";

/** Parse UTM dari query string. Pure — diuji unit. */
export function parseUtm(search: string, url?: string): Utm {
  const p = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const g = (k: string) => p.get(k)?.slice(0, 120) || undefined;
  return {
    utmSource: g("utm_source"),
    utmMedium: g("utm_medium"),
    utmCampaign: g("utm_campaign"),
    utmContent: g("utm_content"),
    landingUrl: url,
  };
}

/** Simpan UTM sekali per sesi (first-touch) agar tetap terbawa saat navigasi. */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const existing = sessionStorage.getItem(KEY);
    const parsed = parseUtm(window.location.search, window.location.href);
    if (!existing || parsed.utmSource) {
      sessionStorage.setItem(KEY, JSON.stringify({ ...(existing ? JSON.parse(existing) : {}), ...stripUndef({ ...parsed }) }));
    }
  } catch {
    /* storage unavailable — abaikan */
  }
}

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function stripUndef(o: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));
}
