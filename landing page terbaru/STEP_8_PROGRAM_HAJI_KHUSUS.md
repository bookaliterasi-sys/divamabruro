# STEP 8 — PROGRAM HAJI KHUSUS

Perubahan utama:

- Paket aktif dipusatkan dalam satu program showcase, bukan beberapa card terpisah.
- Data yang digunakan hanya berasal dari data program yang sudah tersedia di proyek.
- Program menampilkan:
  - nama program
  - durasi 23 hari
  - maskapai yang tercantum
  - hotel dan kota
  - catatan rangkaian program
  - pilihan kamar dan biaya perjalanan
  - skema DP porsi
  - disclaimer biaya, jadwal, hotel, maskapai, dan ketersediaan
  - CTA konsultasi WhatsApp
- Biaya perjalanan dipisahkan secara jelas dari DP porsi.
- Tidak menambahkan hotel, maskapai, harga, jadwal, atau layanan baru yang belum tersedia.
- Layout responsif dibuat sebagai satu area fokus pada desktop dan alur vertikal pada mobile.

File yang diubah:
- `components/Sections.tsx`
- `lib/packages.ts`
- `app/globals.css`
