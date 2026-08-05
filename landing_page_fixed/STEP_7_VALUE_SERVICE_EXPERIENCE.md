# STEP 7 — VALUE & SERVICE EXPERIENCE

Perubahan utama:

- Section pendampingan lama yang berbentuk kumpulan card identik dirombak total.
- Section diposisikan setelah Simulator Cicilan dan sebelum Program Haji.
- Menggunakan layout editorial dengan:
  - headline besar
  - ringkasan nilai layanan
  - pembagian fase sebelum, selama, dan setelah perjalanan
  - tujuh baris layanan bernomor
  - intro sticky pada desktop
  - susunan vertikal yang mudah dipindai pada mobile
- Nilai layanan yang ditampilkan:
  1. Perencanaan lebih terarah.
  2. Informasi skema yang transparan.
  3. Pendampingan dokumen.
  4. Manasik dan persiapan.
  5. Kenyamanan jamaah dan orang tua.
  6. Konsultasi yang mudah.
  7. Pendampingan sebelum, selama, dan setelah perjalanan.
- CTA WhatsApp menggunakan template konteks pendampingan yang sudah tersedia.
- Tidak menambahkan klaim, foto, atau data layanan yang belum terverifikasi.

File yang diubah:
- `components/Sections.tsx`
- `app/page.tsx`
- `app/globals.css`

Validasi:
- 27 file TS/TSX berhasil diparse tanpa kesalahan sintaks.
- Struktur CSS seimbang tanpa kurung kurawal yang tidak tertutup.
- Urutan halaman terverifikasi: Simulator → Value & Service Experience → Program.
- Instalasi dependensi dan production build belum dapat dijalankan karena registry paket lingkungan mengembalikan 404 untuk `yocto-queue@0.1.0`.
