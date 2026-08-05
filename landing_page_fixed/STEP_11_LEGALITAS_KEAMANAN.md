# STEP 11 — LEGALITAS DAN KEAMANAN

Perubahan utama:

- Section legalitas lama dirombak menjadi pusat verifikasi yang tenang dan profesional.
- Nomor izin dan status aktif yang sebelumnya ditampilkan secara tegas dihapus dari UI agar tidak memperkuat klaim yang belum dikonfirmasi ulang.
- Informasi dibagi menjadi enam area yang dapat diperiksa:
  1. legalitas
  2. rekening resmi
  3. kantor
  4. kontak resmi
  5. proses pembayaran
  6. pendampingan
- Alamat kantor dan nomor WhatsApp hanya memakai data yang telah tersedia di proyek.
- Ditambahkan checklist empat langkah sebelum melakukan pembayaran.
- CTA utama: `Verifikasi dan Konsultasi Sekarang`.
- Event analytics baru: `legal_whatsapp_click`.
- Section dipindahkan setelah Pendampingan Jamaah agar mengikuti urutan narasi landing page.

File yang diubah:

- `components/Sections.tsx`
- `app/page.tsx`
- `app/globals.css`
- `lib/analytics.ts`
- `lib/faq.ts`
