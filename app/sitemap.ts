import { MetadataRoute } from "next";
import { DATA } from "@/lib/data";

const SITE_URL = "https://stopmaternalmortality.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const countryPages = DATA.map((country) => ({
    url: `${SITE_URL}/country/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...countryPages,
  ];
}
