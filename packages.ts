/** Program Haji Khusus Diva — hanya data terverifikasi dari materi resmi. */
export const HAJI_PKG = {
  id: "diva-haji-plus",
  badge: "★ Haji Plus",
  name: "Diva Haji Plus (Non Arbain)",
  durationDays: 23,
  airline: "Scoot / Etihad",
  curr: "USD" as const,
  priceQuad: 13400,
  priceTriple: 14400,
  priceDouble: 15400,
  hotels: [
    { name: "Marriott", city: "Makkah", stars: 5 },
    { name: "Hotel ✳3", city: "Madinah", stars: 3 },
    { name: "Hotel Apartemen Rosaifah", city: "Makkah", stars: 5 },
  ],
  notes: [
    "Keberangkatan 26 Zulqodah",
    "Kepulangan 18–19 Zulhijah",
    "Program Nafar Awal",
    "Program opsional Tarwiyah & Nafar Tsani",
  ],
};
