# STEP 6 — SIMULATOR CICILAN

Perubahan utama:

- Desain simulator dirombak total agar lebih sederhana dan tidak terasa seperti formulir perbankan.
- Hierarki angka diperkuat dengan fokus utama pada estimasi cicilan per bulan.
- Kurs simulasi tetap bisa diubah.
- Pilihan tenor tetap dipertahankan.
- Informasi yang ditampilkan:
  - kurs yang digunakan
  - setoran awal
  - sisa DP
  - total DP porsi
  - tenor
  - estimasi per bulan
- CTA WhatsApp tetap mengirim hasil simulasi yang dipilih pengguna.
- Ditambahkan penjelasan bahwa angka hanyalah simulasi.
- Ditambahkan disclaimer yang jelas bahwa:
  - simulasi bukan harga keseluruhan perjalanan
  - nilai dapat berubah mengikuti kurs dan ketentuan
  - konfirmasi resmi dilakukan melalui konsultan Diva Mabruro
- Ditambahkan event analytics `simulation_changed`.

File yang diubah:
- `components/Simulator.tsx`
- `lib/analytics.ts`
