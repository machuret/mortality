import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { getAnalysisBySlug } from "@/lib/countryAnalysis";
import CountryPageClient from "@/components/CountryPageClient";

export async function generateStaticParams() {
  return DATA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = DATA.find((c) => c.slug === slug);
  if (!country) return { title: "Country Not Found" };
  return {
    title: `${country.name} — Child & Maternal Mortality | Every Life Counts`,
    description: `Infant mortality ${country.infant} per 1,000 · Maternal mortality ${country.maternal} per 100,000. In-depth analysis of child and maternal mortality in ${country.name}.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = DATA.find((c) => c.slug === slug);
  if (!country) notFound();

  const analysis = getAnalysisBySlug(slug);

  return <CountryPageClient country={country} analysis={analysis} />;
}
