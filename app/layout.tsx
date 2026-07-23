import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Haji Khusus Ala Sultan Mulai Rp1,2 Juta/Bulan | Diva Mabruro",
  description:
    "Amankan porsi Haji Khusus bersama Diva Mabruro. Simulasikan setoran awal USD 1.000 dan cicilan sisa DP mulai sekitar Rp1,2 juta per bulan dengan asumsi kurs Rp18.000/USD.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Haji Khusus Ala Sultan Mulai Rp1,2 Juta/Bulan | Diva Mabruro",
    description:
      "Haji Ala Sultan Gak Harus Mahal. Skema porsi Haji Khusus transparan: total DP USD 5.000, setoran awal USD 1.000, sisa DP dapat dicicil.",
    url: "/",
    siteName: "Diva Mabruro",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/img/hero.webp", width: 720, height: 1280, alt: "Jamaah Diva Mabruro" }],
  },
  twitter: { card: "summary_large_image", title: "Haji Khusus Ala Sultan Mulai Rp1,2 Juta/Bulan | Diva Mabruro" },
  robots: { index: true, follow: true },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Diva Mabruro",
  legalName: "PT Diva Mabruro",
  slogan: "Haji Ala Sultan Gak Harus Mahal",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/diva-t.png`,
  telephone: `+${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289671922111").replace(/\D/g, "")}`,
  sameAs: ["https://instagram.com/divaumrohhaji"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Juanda Business Center (JBC) Blok A8-9, Jl. Raya Bandara Juanda, Gedangan",
    addressLocality: "Sidoarjo",
    addressRegion: "Jawa Timur",
    postalCode: "61254",
    addressCountry: "ID",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Program Porsi Haji Khusus Diva Mabruro",
      description:
        "Skema mendapatkan porsi Haji Khusus: total DP USD 5.000, setoran awal USD 1.000, sisa DP USD 4.000 dapat dicicil hingga 60 bulan (simulasi kurs Rp18.000/USD).",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        {gtm && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
            </Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
            </noscript>
          </>
        )}
        {pixel && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
        )}
        <a href="#konten" className="skip-link">Langsung ke konten</a>
        {children}
      </body>
    </html>
  );
}
