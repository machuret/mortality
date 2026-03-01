import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stop Maternal Mortality — Global Child & Maternal Mortality Tracker",
  description:
    "Real-time estimates of child and maternal mortality worldwide. stopmaternalmortality.com — Based on WHO, UNICEF, and UN IGME 2024 data.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
