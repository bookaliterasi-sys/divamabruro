# STEP 9 — DOCUMENTATION SHOWCASE

Perubahan utama:

- Lima video perjalanan dan enam poster/infografis digabungkan menjadi satu cinematic documentation showcase.
- Ditambahkan pemilih kategori Video dan Poster.
- Desktop memakai media utama berukuran besar, caption editorial, nomor slide, dan kontrol panah.
- Mobile memakai satu media dominan per layar dengan native horizontal swipe dan scroll snap.
- Video memakai poster preview, `preload="none"`, `playsInline`, dan native controls.
- Semua gambar tetap memakai `next/image` dengan lazy loading.
- Seluruh poster ditempatkan dalam frame 4:5 yang konsisten; poster rute landscape tetap ditampilkan utuh dengan `object-contain`.
- Caption diperbesar dan dipersingkat agar mudah dibaca di mobile.
- Section lama video dan poster terpisah tidak lagi dipanggil pada halaman sehingga tidak terjadi duplikasi.
- Anchor navigasi diperbarui dari `#video` menjadi `#dokumentasi`.
- Ditambahkan event analytics `documentation_interaction`.

File utama yang diubah:

- `components/DocumentationShowcase.tsx` — file baru
- `app/page.tsx`
- `components/Header.tsx`
- `components/Sections.tsx`
- `lib/analytics.ts`
- `app/globals.css`

Validasi:

- Syntax check seluruh file TS/TSX: lolos tanpa diagnostik.
- Struktur CSS: jumlah kurung pembuka dan penutup seimbang.
- Anchor navigasi `#dokumentasi`: valid.
- Tidak ada pemanggilan galeri video/poster lama yang terduplikasi.
- Pemeriksaan production build tidak dapat diselesaikan karena registry dependensi lingkungan gagal menyediakan paket yang dibutuhkan.
