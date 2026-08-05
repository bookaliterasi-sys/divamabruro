/** Estimasi antrean — dasar Kalkulator Usia & tren. Angka mengikuti materi resmi Diva (Fasilitas Haji Plus 2026: masa tunggu 5–9 tahun estimasi). */
export const TUNGGU_KHUSUS_MIN = 5;
export const TUNGGU_KHUSUS_MAX = 9;
export const TUNGGU_REGULER_MIN = 25;
export const TUNGGU_REGULER_MAX = 40;

export const usiaBerangkat = (usia: number, tahun: number) => usia + tahun;
