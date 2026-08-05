# Step 2 — Cinematic Hero

## Perubahan

- Hero dirombak total menjadi layout conversion-first dua kolom untuk desktop.
- Headline utama: “Rencanakan Haji Khusus dengan lebih tenang.”
- Supporting line: “Haji Ala Sultan Gak Harus Mahal”.
- Penawaran utama USD 1.000 dapat dipahami dalam beberapa detik pertama.
- CTA WhatsApp ditempatkan sebagai aksi utama.
- CTA simulator ditempatkan sebagai aksi sekunder.
- Ditambahkan microcopy bahwa konsultasi awal gratis dan tidak mengikat.
- Visual utama menggunakan aset lokal yang sudah tersedia pada proyek, bukan gambar stock atau gambar buatan.
- Urutan mobile: headline, penjelasan, WhatsApp, simulator, lalu visual.
- Ditambahkan cinematic entrance berbasis CSS dengan opacity, blur, transform, dan reduced-motion fallback.
- Ditambahkan ringkasan penawaran serta floating information cards yang tetap ringan.
- Nomor dan sistem pesan WhatsApp dari Step 1 tetap dipertahankan.

## File utama yang diubah

- `components/Hero.tsx`
- `app/globals.css`

## Validasi

- Pemeriksaan sintaks terhadap 26 file TypeScript/TSX: tidak ditemukan syntax error.
- Jumlah kurung CSS pembuka dan penutup seimbang.
- Scan nomor WhatsApp lama dan teks internal “Asal:” tidak menemukan hasil.
- Root proyek Next.js terverifikasi.
- Production build belum dapat dijalankan di lingkungan pengerjaan karena registry npm mengalami kegagalan DNS `EAI_AGAIN` saat mengambil dependency. Ini merupakan kendala jaringan lingkungan, bukan error build aplikasi yang sudah terdeteksi.
