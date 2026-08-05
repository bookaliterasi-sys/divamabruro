# STEP 13 — FAQ

Perubahan:

- FAQ dikelompokkan menjadi enam kategori:
  1. Skema porsi
  2. Pembayaran
  3. Dokumen
  4. Keberangkatan
  5. Keamanan
  6. Konsultasi
- Pertanyaan relevan dari versi sebelumnya dipertahankan dan dirapikan.
- Jawaban yang terlalu absolut diubah menjadi bahasa yang lebih aman dan meminta konfirmasi resmi jika informasinya dapat berubah.
- Ditambahkan navigasi kategori yang sticky dan horizontal-scroll pada mobile.
- Ditambahkan CTA WhatsApp setelah kategori skema porsi dan keamanan.
- Setiap CTA memakai template pesan yang berbeda tanpa label internal seperti “Asal”.
- Accordion tetap ramah keyboard dengan `aria-expanded`, `aria-controls`, dan panel `role=region`.
- Semua FAQ tetap tersedia dalam HTML dan `FAQS` tetap menjadi array datar untuk structured data FAQPage.
- Event analytics `faq_whatsapp_click` ditambahkan.

File yang diubah:
- `components/Faq.tsx`
- `lib/faq.ts`
- `lib/whatsapp.ts`
- `lib/analytics.ts`
- `app/globals.css`
