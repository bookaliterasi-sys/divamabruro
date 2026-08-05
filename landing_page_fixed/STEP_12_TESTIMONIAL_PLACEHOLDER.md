# STEP 12 — TESTIMONIAL PLACEHOLDER

Perubahan utama:

- Menambahkan komponen testimonial premium yang siap menerima data asli.
- Menambahkan sumber data terpisah di `lib/testimonials.ts`.
- Tidak membuat nama jamaah, kutipan, foto wajah, lokasi, atau tahun palsu.
- Section otomatis tidak tampil selama data testimonial kosong.
- Preview placeholder dapat diaktifkan dengan:
  - `NEXT_PUBLIC_SHOW_TESTIMONIAL_PLACEHOLDER=true`
- Placeholder memiliki slot terstruktur untuk foto dan kutipan, tetapi tidak menampilkan identitas fiktif.
- Ketika data asli tersedia, item pertama menjadi testimonial utama dan item berikutnya tampil dalam rail responsif.
- Foto bersifat opsional; jika tidak tersedia, komponen memakai bidang visual netral tanpa wajah buatan.

File yang ditambahkan:
- `components/Testimonials.tsx`
- `lib/testimonials.ts`
- `STEP_12_TESTIMONIAL_PLACEHOLDER.md`

File yang diubah:
- `app/page.tsx`
- `app/globals.css`
- `.env.example`
