/** Perakit pesan WhatsApp Diva Mabruro (dipakai komponen + unit test). */
import { rupiah } from "./wa";
import { SETORAN_AWAL_USD, SISA_DP_USD, TOTAL_DP_USD, cicilanBulanan, setoranAwalRupiah, sisaDpRupiah, totalDpRupiah } from "./simulasi";

export interface UtmData { source?: string | null; medium?: string | null; campaign?: string | null }

export function utmLine(utm?: UtmData | null): string {
  if (!utm) return "";
  const parts = [
    utm.source ? `src:${utm.source}` : null,
    utm.medium ? `med:${utm.medium}` : null,
    utm.campaign ? `cmp:${utm.campaign}` : null,
  ].filter(Boolean);
  return parts.length ? `\n(ref ${parts.join(" · ")})` : "";
}

/** Baca UTM tersimpan di browser — aman dipanggil di server (mengembalikan null). */
export function readUtm(): UtmData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("dt_utm_v1");
    if (!raw) return null;
    const p = JSON.parse(raw) as Record<string, string>;
    return { source: p.utm_source ?? null, medium: p.utm_medium ?? null, campaign: p.utm_campaign ?? null };
  } catch {
    return null;
  }
}

export function buildGeneralMessage(source: string, utm?: UtmData | null): string {
  return (
    "Assalamu'alaikum, saya mengunjungi website Diva Mabruro dan ingin berkonsultasi mengenai program Haji Khusus serta skema mendapatkan porsi." +
    `\nAsal: ${source}` +
    utmLine(utm)
  );
}

export function buildSimulationMessage(kurs: number, tenor: number, utm?: UtmData | null): string {
  return (
    "Assalamu'alaikum, saya baru saja membuat simulasi porsi Haji Khusus di website Diva Mabruro:" +
    `\n• Program: Porsi Haji Khusus Diva Mabruro` +
    `\n• Kurs simulasi: ${rupiah(kurs)}/USD` +
    `\n• Total DP: USD ${TOTAL_DP_USD.toLocaleString("en-US")} ≈ ${rupiah(totalDpRupiah(kurs))}` +
    `\n• Setoran awal: USD ${SETORAN_AWAL_USD.toLocaleString("en-US")} ≈ ${rupiah(setoranAwalRupiah(kurs))}` +
    `\n• Sisa DP: USD ${SISA_DP_USD.toLocaleString("en-US")} ≈ ${rupiah(sisaDpRupiah(kurs))}` +
    `\n• Tenor: ${tenor} bulan` +
    `\n• Estimasi setoran: ≈ ${rupiah(cicilanBulanan(kurs, tenor))}/bulan` +
    "\nMohon dibantu konsultasi lanjutan." +
    utmLine(utm)
  );
}
