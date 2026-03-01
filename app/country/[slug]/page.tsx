import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { getAnalysisBySlug } from "@/lib/countryAnalysis";
import CountryPageClient from "@/components/CountryPageClient";

const SITE_URL = "https://stopmaternalmortality.com";
const SITE_NAME = "Stop Maternal Mortality";

export async function generateStaticParams() {
  return DATA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = DATA.find((c) => c.slug === slug);
  if (!country) return { title: "Country Not Found" };

  const pageUrl = `${SITE_URL}/country/${slug}`;
  const ogImage = `${SITE_URL}/og-default.png`;

  const title = `${country.name} Maternal & Child Mortality Data — ${country.infant} infant deaths per 1,000 live births`;
  const description = `${country.name} has an infant mortality rate of ${country.infant} per 1,000 live births and a maternal mortality ratio of ${country.maternal} per 100,000. Explore in-depth analysis of causes, POCUS deployment plans, and what it would take to save lives in ${country.region}.`;

  return {
    title,
    description,
    keywords: [
      `${country.name} maternal mortality`,
      `${country.name} infant mortality`,
      `${country.name} child mortality`,
      `${country.name} health data`,
      `${country.region} maternal health`,
      "POCUS",
      "point-of-care ultrasound",
      "preventable deaths",
      "obstetric care",
      "GUSI training",
      "WHO data",
      "UNICEF",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${country.name} — maternal and child mortality data`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@stopmmortality",
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = DATA.find((c) => c.slug === slug);
  if (!country) notFound();

  const analysis = getAnalysisBySlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${country.name} — Maternal & Child Mortality Data`,
    description: `Infant mortality rate: ${country.infant} per 1,000 live births. Maternal mortality ratio: ${country.maternal} per 100,000 live births. Data for ${country.name} (${country.region}).`,
    url: `${SITE_URL}/country/${slug}`,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "Maternal Mortality" },
      { "@type": "Thing", name: "Infant Mortality" },
      { "@type": "Thing", name: "Point-of-Care Ultrasound" },
    ],
    spatialCoverage: {
      "@type": "Place",
      name: country.name,
    },
    temporalCoverage: "2024",
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryPageClient country={country} analysis={analysis} />
    </>
  );
}
