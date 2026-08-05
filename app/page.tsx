import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Simulator from "@/components/Simulator";
import DocumentationShowcase from "@/components/DocumentationShowcase";
import JamaahJourney from "@/components/JamaahJourney";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import StickyBar from "@/components/StickyBar";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import ScrollFx from "@/components/ScrollFx";
import JourneyStory from "@/components/JourneyStory";
import { TrustStrip, ProblemPossibility, Program, Pendampingan, QueueCompare, Legalitas, Proses, FinalCta, Footer } from "@/components/Sections";
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
        <ProblemPossibility />
        <JourneyStory />
        <Simulator />
        <Pendampingan />
        <Program />
        <DocumentationShowcase />
        <JamaahJourney />
        <Legalitas />
        <Testimonials />
        <QueueCompare />
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
