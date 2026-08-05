# Step 4 — Problem to Possibility

## Perubahan

- Menambahkan section `ProblemPossibility` tepat setelah Trust Statement.
- Menyusun lima kekhawatiran calon jamaah menjadi pasangan masalah dan langkah yang memungkinkan.
- Menambahkan narasi empatik tanpa menakut-nakuti atau menjanjikan hasil yang tidak pasti.
- Menambahkan CTA konsultasi WhatsApp dengan pesan khusus untuk konteks ini.
- Menambahkan CTA sekunder menuju simulator.
- Menambahkan event analytics khusus untuk kedua CTA.
- Menambahkan tata letak editorial dengan intro sticky di desktop dan alur vertikal di mobile.
- Menambahkan reduced-motion fallback dan efek reveal yang memakai sistem `ScrollFx` yang sudah ada.

## File utama yang diubah

- `app/page.tsx`
- `components/Sections.tsx`
- `app/globals.css`
- `lib/whatsapp.ts`
- `lib/analytics.ts`
- `tests/whatsapp.test.ts`

## Validasi

- Transpilasi sintaks seluruh file TS/TSX: lulus.
- Pemeriksaan keseimbangan kurung CSS: lulus.
- Pengujian fungsi pesan WhatsApp baru: lulus.
- Pemeriksaan nomor lama dan label internal CTA: lulus.
- Production build belum dapat dijalankan di lingkungan kerja karena dependensi proyek tidak tersedia dan instalasi registry tidak dapat diselesaikan.
