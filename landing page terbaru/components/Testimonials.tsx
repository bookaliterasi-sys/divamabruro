import Image from "next/image";
import { Quote, ShieldCheck } from "lucide-react";
import { TESTIMONIALS, type TestimonialEntry } from "@/lib/testimonials";

const PLACEHOLDER_COUNT = 3;

function TestimonialFigure({ item, featured = false }: { item: TestimonialEntry; featured?: boolean }) {
  return (
    <figure className={featured ? "testimonial-premium__feature" : "testimonial-premium__item"}>
      <div className="testimonial-premium__media">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.photoAlt || `Dokumentasi ${item.name}`}
            fill
            sizes={featured ? "(min-width: 1024px) 42vw, 92vw" : "(min-width: 1024px) 24vw, 86vw"}
            className="object-cover"
          />
        ) : (
          <div className="testimonial-premium__media-empty" aria-hidden />
        )}
      </div>

      <figcaption className="testimonial-premium__content">
        <Quote size={featured ? 34 : 26} strokeWidth={1.45} aria-hidden />
        <blockquote>{item.quote}</blockquote>
        <div className="testimonial-premium__person">
          <strong>{item.name}</strong>
          {[item.journeyLabel, item.city, item.year].filter(Boolean).length > 0 ? (
            <span>{[item.journeyLabel, item.city, item.year].filter(Boolean).join(" · ")}</span>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

function EmptyPlaceholder() {
  return (
    <div className="testimonial-premium__placeholder" aria-label="Struktur testimonial menunggu materi asli">
      <div className="testimonial-premium__placeholder-main" data-slot="testimonial-primary">
        <div className="testimonial-premium__placeholder-photo" data-slot="testimonial-photo-01" aria-hidden />
        <div className="testimonial-premium__placeholder-copy">
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </div>
      </div>

      <div className="testimonial-premium__placeholder-rail">
        {Array.from({ length: PLACEHOLDER_COUNT - 1 }, (_, index) => (
          <div
            key={index}
            className="testimonial-premium__placeholder-small"
            data-slot={`testimonial-${String(index + 2).padStart(2, "0")}`}
            aria-hidden
          >
            <div />
            <span />
            <span />
          </div>
        ))}
      </div>

      <p>
        Slot ini hanya akan diisi dengan foto dan pernyataan jamaah asli setelah materi tersedia serta izin publikasi dikonfirmasi.
      </p>
    </div>
  );
}

export default function Testimonials() {
  const showPlaceholder = process.env.NEXT_PUBLIC_SHOW_TESTIMONIAL_PLACEHOLDER === "true";
  const hasTestimonials = TESTIMONIALS.length > 0;

  if (!hasTestimonials && !showPlaceholder) return null;

  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section id="testimoni" className="testimonial-premium" aria-labelledby="testimonial-heading">
      <div aria-hidden className="testimonial-premium__orb testimonial-premium__orb--one" />
      <div aria-hidden className="testimonial-premium__orb testimonial-premium__orb--two" />

      <div className="shell testimonial-premium__shell">
        <div data-fx className="testimonial-premium__heading">
          <div>
            <p className="testimonial-premium__eyebrow">Cerita jamaah</p>
            <h2 id="testimonial-heading">Pengalaman yang diceritakan dengan jujur, bukan dibuat-buat.</h2>
          </div>
          <div className="testimonial-premium__trust-note">
            <ShieldCheck size={20} strokeWidth={1.65} aria-hidden />
            <p>Hanya materi asli yang telah mendapat izin publikasi yang akan ditampilkan.</p>
          </div>
        </div>

        {hasTestimonials && featured ? (
          <div className="testimonial-premium__layout">
            <TestimonialFigure item={featured} featured />
            {rest.length > 0 ? (
              <div className="testimonial-premium__rail" aria-label="Testimonial jamaah lainnya">
                {rest.map((item) => (
                  <TestimonialFigure item={item} key={item.id} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <EmptyPlaceholder />
        )}
      </div>
    </section>
  );
}
