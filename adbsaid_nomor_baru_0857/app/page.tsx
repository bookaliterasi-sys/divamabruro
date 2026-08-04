import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Simulator from "@/components/Simulator";
import VideoCarousel from "@/components/VideoCarousel";
import Faq from "@/components/Faq";
import StickyBar from "@/components/StickyBar";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import ScrollFx from "@/components/ScrollFx";
import { TrustStrip, Skema, Program, Pendampingan, QueueCompare, Legalitas, Edukasi, Proses, FinalCta, Footer } from "@/components/Sections";
import { FAQS } from "@/lib/faq";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main id="konten">
        <Hero />
        <TrustStrip />
        <Legalitas />
        <Simulator />
        <Skema />
        <Program />
        <VideoCarousel />
        <Pendampingan />
        <QueueCompare />
        <Edukasi />
        <Proses />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
      <AnalyticsBeacon />
      <ScrollFx />
    </>
  );
}
