/**
 * Cinematic hero Diva Mabruro.
 * Server Component: headline, value proposition, dan CTA tetap tersedia tanpa JavaScript.
 */
import Image from "next/image";
import { ArrowDown, ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import TrackLink from "@/components/TrackLink";
import WaLink from "@/components/WaLink";
import { buildGeneralMessage } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="hero" className="hero-cinematic" aria-labelledby="hero-title">
      <div aria-hidden className="hero-cinematic__wash" />
      <div aria-hidden className="hero-cinematic__grain" />
      <div aria-hidden className="hero-cinematic__line hero-cinematic__line--one" />
      <div aria-hidden className="hero-cinematic__line hero-cinematic__line--two" />

      <div className="shell hero-cinematic__layout">
        <div className="hero-cinematic__copy">
          <div className="hero-cinematic__badge hero-enter hero-enter--1">
            <ShieldCheck size={16} aria-hidden />
            <span>Konsultasi transparan dan terarah</span>
          </div>

          <p className="hero-cinematic__support hero-enter hero-enter--2">
            Haji Ala Sultan Gak Harus Mahal
          </p>

          <h1 id="hero-title" className="hero-cinematic__title hero-enter hero-enter--3">
            Rencanakan Haji Khusus dengan <span>lebih tenang.</span>
          </h1>

          <p className="hero-cinematic__lead hero-enter hero-enter--4">
            Mulai dari setoran awal <strong>USD 1.000</strong>, dengan skema cicilan sisa DP yang dapat disesuaikan.
          </p>

          <div className="hero-cinematic__actions hero-enter hero-enter--5">
            <WaLink
              message={buildGeneralMessage("hero")}
              event="hero_cta_click"
              data={{ placement: "hero", cta: "whatsapp" }}
              className="btn btn-red hero-cinematic__primary"
              ariaLabel="Konsultasi gratis mengenai Haji Khusus melalui WhatsApp"
            >
              <MessageCircle size={19} aria-hidden />
              Konsultasi via WhatsApp
              <ArrowUpRight size={17} aria-hidden />
            </WaLink>

            <TrackLink
              href="#simulasi"
              event="hero_cta_click"
              data={{ placement: "hero", cta: "simulasi" }}
              className="btn hero-cinematic__secondary"
            >
              Hitung Simulasi Cicilan
              <ArrowDown size={17} aria-hidden />
            </TrackLink>
          </div>

          <p className="hero-cinematic__microcopy hero-enter hero-enter--6">
            Konsultasi awal gratis, tidak mengikat, dan langsung bersama tim Diva Mabruro.
          </p>

          <div className="hero-cinematic__facts hero-enter hero-enter--6" aria-label="Ringkasan penawaran">
            <div>
              <span>Mulai dari</span>
              <strong>USD 1.000</strong>
            </div>
            <div>
              <span>Skema pembayaran</span>
              <strong>Dapat disesuaikan</strong>
            </div>
          </div>
        </div>

        <div className="hero-cinematic__visual hero-visual-enter" data-slot="hero-primary-visual">
          <div className="hero-cinematic__frame">
            <Image
              src="/img/hero.webp"
              alt="Tim Diva Mabruro dalam kegiatan pelayanan dan konsultasi jamaah"
              fill
              priority
              sizes="(max-width: 767px) 92vw, (max-width: 1199px) 44vw, 500px"
              className="hero-cinematic__image"
            />
            <div aria-hidden className="hero-cinematic__image-overlay" />

            <div className="hero-cinematic__visual-label">
              <span>Pendampingan nyata</span>
              <strong>Dari konsultasi sampai persiapan keberangkatan</strong>
            </div>
          </div>

          <div className="hero-cinematic__float-card hero-cinematic__float-card--price">
            <span>Setoran awal porsi</span>
            <strong>USD 1.000</strong>
            <small>Sisa DP dapat dicicil sesuai pilihan tenor.</small>
          </div>

          <div className="hero-cinematic__float-card hero-cinematic__float-card--trust">
            <ShieldCheck size={18} aria-hidden />
            <span>Informasi skema dijelaskan sebelum Anda mengambil keputusan.</span>
          </div>
        </div>
      </div>

      <a className="hero-cinematic__scroll" href="#simulasi" aria-label="Lihat simulator cicilan">
        <span>Geser untuk memahami skemanya</span>
        <ArrowDown size={16} aria-hidden />
      </a>
    </section>
  );
}
