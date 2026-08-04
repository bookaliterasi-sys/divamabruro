/** Satu pintu WhatsApp Diva Mabruro — nomor dari env, fallback untuk development. */
export const WA_FALLBACK = "6285705588888"; // +62 857-0558-8888
export const WA_DISPLAY = "+62 857-0558-8888";

export const waNumber = () => (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WA_FALLBACK).replace(/\D/g, "");
export const waLink = (msg: string) => `https://wa.me/${waNumber()}?text=${encodeURIComponent(msg)}`;

export const rupiah = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
export const usd = (n: number) => "USD " + Math.round(n).toLocaleString("en-US");
