# STEP 10 — PENDAMPINGAN JAMAAH

Perubahan utama:

- Menambahkan section pengalaman jamaah dari konsultasi hingga kepulangan.
- Tujuh tahap yang ditampilkan:
  1. Konsultasi
  2. Administrasi
  3. Manasik
  4. Persiapan
  5. Keberangkatan
  6. Pelaksanaan ibadah
  7. Kepulangan
- Desktop menggunakan cinematic sticky sequence dengan timeline navigasi di sisi kiri.
- Mobile menggunakan alur vertikal biasa agar tidak terjadi scroll trap.
- Dokumentasi yang sudah tersedia digunakan untuk manasik, keberangkatan, dan pelaksanaan ibadah.
- Tahap yang belum memiliki visual menggunakan placeholder kosong dengan `data-slot`.
- Tidak menggunakan stock image atau foto jamaah palsu.
- Menambahkan CTA konsultasi pendampingan melalui WhatsApp.
- Menambahkan navigasi header menuju section Pendampingan.

File yang ditambahkan:
- `components/JamaahJourney.tsx`

File yang diubah:
- `app/page.tsx`
- `components/Header.tsx`
- `app/globals.css`
