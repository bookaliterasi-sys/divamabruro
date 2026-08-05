/** Perakit pesan WhatsApp Diva Mabruro (dipakai komponen + unit test). */
import { rupiah } from "./wa";
import {
  SETORAN_AWAL_USD,
  SISA_DP_USD,
  TOTAL_DP_USD,
  cicilanBulanan,
  setoranAwalRupiah,
  sisaDpRupiah,
  totalDpRupiah,
} from "./simulasi";

export interface UtmData {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
}

export type WhatsAppMessageContext =
  | "header"
  | "mobile_menu"
  | "hero"
  | "problem_possibility"
  | "journey"
  | "sticky_mobile"
  | "program_haji"
  | "pendampingan"
  | "legalitas"
  | "faq"
  | "faq_porsi"
  | "faq_keamanan"
  | "faq_konsultasi"
  | "cta_penutup"
  | "footer";

const GENERAL_MESSAGES: Record<WhatsAppMessageContext, string> = {
  header:
    "Assalamu'alaikum, saya ingin berkonsultasi langsung mengenai program Haji Khusus Diva Mabruro. Mohon jelaskan pilihan program dan langkah awal yang perlu saya siapkan.",
  mobile_menu:
    "Assalamu'alaikum, saya sedang melihat layanan Diva Mabruro melalui handphone dan ingin mendapatkan penjelasan ringkas mengenai program Haji Khusus serta proses konsultasinya.",
  hero:
    "Assalamu'alaikum, saya tertarik dengan program Haji Khusus Diva Mabruro dan skema setoran awal USD 1.000. Mohon dibantu penjelasan lengkap mengenai porsi dan pembayarannya.",
  problem_possibility:
    "Assalamu'alaikum, saya sedang mempertimbangkan rencana Haji Khusus tetapi masih ingin memahami proses porsi, pilihan cicilan, keamanan pembayaran, dan pendampingannya. Mohon dibantu menjelaskan pilihan yang sesuai dengan kesiapan saya.",
  journey:
    "Assalamu'alaikum, saya sudah membaca tahapan mendapatkan porsi Haji Khusus di website Diva Mabruro. Mohon jelaskan proses konsultasi, setoran awal USD 1.000, penyelesaian sisa DP, persyaratan dokumen, hingga pendampingan keberangkatan.",
  sticky_mobile:
    "Assalamu'alaikum, saya ingin konsultasi cepat mengenai cara memulai rencana Haji Khusus bersama Diva Mabruro. Mohon dibantu oleh konsultan.",
  program_haji:
    "Assalamu'alaikum, saya ingin mengetahui detail program Haji Khusus Diva Mabruro, termasuk fasilitas, pilihan kamar, estimasi biaya, dan ketersediaannya.",
  pendampingan:
    "Assalamu'alaikum, saya ingin merencanakan Haji Khusus untuk keluarga atau orang tua. Mohon jelaskan bentuk pendampingan dan layanan yang tersedia di Diva Mabruro.",
  legalitas:
    "Assalamu'alaikum, sebelum melanjutkan konsultasi saya ingin meminta informasi legalitas, rekening resmi perusahaan, dan prosedur pembayaran Diva Mabruro.",
  faq:
    "Assalamu'alaikum, saya masih memiliki beberapa pertanyaan mengenai porsi, pembayaran, dokumen, dan keberangkatan Haji Khusus Diva Mabruro. Mohon dibantu penjelasannya.",
  faq_porsi:
    "Assalamu'alaikum, saya ingin memahami skema porsi Haji Khusus Diva Mabruro, termasuk setoran awal USD 1.000, sisa DP, pilihan tenor, dan perbedaannya dengan biaya perjalanan. Mohon dibantu penjelasan yang sesuai dengan rencana saya.",
  faq_keamanan:
    "Assalamu'alaikum, sebelum mengambil keputusan saya ingin memverifikasi dokumen legalitas, rekening resmi perusahaan, tahapan pembayaran, dan bukti transaksi Diva Mabruro. Mohon dibantu informasinya.",
  faq_konsultasi:
    "Assalamu'alaikum, pertanyaan saya belum sepenuhnya terjawab di halaman FAQ. Saya ingin berkonsultasi mengenai program Haji Khusus Diva Mabruro dan langkah yang paling sesuai untuk saya.",
  cta_penutup:
    "Assalamu'alaikum, saya siap mulai menyusun rencana Haji Khusus bersama Diva Mabruro. Mohon arahkan saya ke tahapan konsultasi berikutnya.",
  footer:
    "Assalamu'alaikum, saya menemukan kontak Diva Mabruro dari website resmi dan ingin berbicara dengan konsultan mengenai program Haji Khusus.",
};

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
    return {
      source: p.utm_source ?? null,
      medium: p.utm_medium ?? null,
      campaign: p.utm_campaign ?? null,
    };
  } catch {
    return null;
  }
}

export function buildGeneralMessage(context: WhatsAppMessageContext, utm?: UtmData | null): string {
  return GENERAL_MESSAGES[context] + utmLine(utm);
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
