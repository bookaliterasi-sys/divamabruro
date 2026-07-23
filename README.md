# Diva Mabruro — Haji Khusus (Landing Page)

Landing page resmi **Diva Mabruro (PT Diva Mabruro) — Umrah & Haji Plus**. Merah-putih khas Diva, mobile-first, konversi ke WhatsApp. Next.js 14 (App Router, mayoritas Server Components) · Tailwind · tanpa library animasi.

## Menjalankan
```bash
npm install
cp .env.example .env.local   # isi variabel di bawah
npm run dev                  # http://localhost:3000
npm run typecheck && npm run test && npm run build
```

## Environment variables
| Variabel | Wajib | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ya (produksi) | Domain publik, dipakai canonical/OG/sitemap/robots |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ya | Nomor WA tujuan seluruh CTA (format 62…) |
| `NEXT_PUBLIC_GTM_ID` | opsional | Google Tag Manager |
| `NEXT_PUBLIC_META_PIXEL_ID` | opsional | Meta Pixel |

## Deploy ke Vercel
1. Push repo ke GitHub, lalu "Import Project" di Vercel (framework terdeteksi Next.js otomatis).
2. Isi keempat env var di Project Settings → Environment Variables.
3. Deploy. Tidak ada konfigurasi khusus lain.

## Fitur utama
Hero Haji Khusus (H1 + CTA tampil tanpa menunggu JS) · Simulator porsi (kurs + tenor 12–60 bln, formula di `lib/simulasi.ts`, teruji unit test) · Program Diva Haji Plus (biaya program dibedakan dari DP porsi) · Carousel 5 video dokumentasi Diva (scroll-snap native, hanya video aktif±1 yang memuat source) · FAQ 12 tanya-jawab + JSON-LD FAQPage · Sticky bar konversi mobile · Analytics event khusus Diva.

## Catatan verifikasi data
Harga program (USD 13.400–15.400), hotel, maskapai, alamat kantor, dan estimasi antrean berasal dari materi lama — mohon dikonfirmasi ulang oleh tim Diva sebelum kampanye besar.
