export interface TestimonialEntry {
  id: string;
  name: string;
  quote: string;
  photo?: string;
  photoAlt?: string;
  journeyLabel?: string;
  city?: string;
  year?: string;
}

/**
 * Isi hanya dengan testimonial asli yang sudah mendapat persetujuan publikasi.
 * Section otomatis tidak tampil selama array ini kosong.
 */
export const TESTIMONIALS: TestimonialEntry[] = [];
