import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://stopmaternalmortality.com";
const SITE_NAME = "Stop Maternal Mortality";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stop Maternal Mortality — Global Child & Maternal Mortality Data",
    template: "%s | Stop Maternal Mortality",
  },
  description:
    "Data-driven analysis of child and maternal mortality in the world's 30 highest-risk countries. Track infant mortality rates, maternal deaths, and what POCUS technology can do to save lives — based on WHO, UNICEF, and UN IGME 2024 data.",
  keywords: [
    "maternal mortality",
    "child mortality",
    "infant mortality rate",
    "under-5 mortality",
    "POCUS",
    "point-of-care ultrasound",
    "GUSI",
    "global health",
    "sub-Saharan Africa",
    "WHO data",
    "UNICEF",
    "preventable deaths",
    "obstetric care",
    "maternal health",
    "newborn health",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Stop Maternal Mortality — Global Child & Maternal Mortality Data",
    description:
      "Where are children and mothers most at risk? Track infant mortality, maternal deaths, and the impact of POCUS technology across the 30 highest-mortality countries — backed by WHO, UNICEF, and UN IGME 2024 data.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
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
      "Data on child and maternal mortality in the world's 30 highest-risk countries, with analysis of how POCUS technology can prevent deaths.",
    images: [DEFAULT_OG_IMAGE],
    site: "@stopmmortality",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Open+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0E4D8C" />
      </head>
      <body>{children}</body>
    </html>
  );
}
