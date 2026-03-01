import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CountryCarousel from "@/components/CountryCarousel";
import WorldMap from "@/components/WorldMap";
import RankingsTable from "@/components/RankingsTable";
import Footer from "@/components/Footer";

const SITE_URL = "https://stopmaternalmortality.com";
const SITE_NAME = "Stop Maternal Mortality";

export const metadata: Metadata = {
  title: "Stop Maternal Mortality — Global Child & Maternal Mortality Data",
  description:
    "Every year, hundreds of thousands of women die in childbirth and millions of children die before their fifth birthday — from preventable causes. Track infant mortality, maternal mortality, and the life-saving potential of POCUS technology across the 30 highest-risk countries. Data from WHO, UNICEF, and UN IGME 2024.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Stop Maternal Mortality — Global Child & Maternal Mortality Data",
    description:
      "Every year, hundreds of thousands of women die in childbirth and millions of children die before their fifth birthday — from preventable causes. Track infant mortality, maternal mortality, and the life-saving potential of POCUS technology across the 30 highest-risk countries.",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Stop Maternal Mortality — Global mortality data dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Maternal Mortality — Global Child & Maternal Mortality Data",
    description:
      "Track infant mortality, maternal deaths, and POCUS technology impact across the 30 highest-risk countries. WHO · UNICEF · UN IGME 2024 data.",
    images: [`${SITE_URL}/og-default.png`],
    site: "@stopmmortality",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Data-driven analysis of child and maternal mortality in the world\u2019s 30 highest-risk countries.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/country/{slug}`,
        },
        "query-input": "required name=slug",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-default.png`,
      },
      sameAs: [],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <CountryCarousel />

      {/* Map section */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--unicef-dark)", whiteSpace: "nowrap" }}>Interactive World Map</h2>
          <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "-1.4rem", marginBottom: "1.6rem" }}>
          Hover any country to see its mortality data · Darker = higher mortality · Scroll to zoom · Drag to pan
        </p>
        <WorldMap />
      </div>

      {/* Rankings section */}
      <div id="rankings" style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem 3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--unicef-dark)", whiteSpace: "nowrap" }}>Country Rankings — Top 30</h2>
          <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
        </div>
        <RankingsTable />
      </div>

      <Footer />
    </>
  );
}
