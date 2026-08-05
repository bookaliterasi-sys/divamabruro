/** Skema porsi Haji Khusus Diva Mabruro — seluruh angka dihitung dari formula. */
export const TOTAL_DP_USD = 5000;
export const SETORAN_AWAL_USD = 1000;
export const SISA_DP_USD = 4000;
export const KURS_DEFAULT = 18000;
export const TENORS = [12, 24, 36, 48, 60] as const;
export const TENOR_DEFAULT = 60;

export const totalDpRupiah = (kurs: number) => TOTAL_DP_USD * kurs;
export const setoranAwalRupiah = (kurs: number) => SETORAN_AWAL_USD * kurs;
export const sisaDpRupiah = (kurs: number) => SISA_DP_USD * kurs;
export const cicilanBulanan = (kurs: number, tenor: number) => sisaDpRupiah(kurs) / tenor;
