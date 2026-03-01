import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Every Life Counts — Global Child & Maternal Mortality",
  description:
    "Real-time estimates of child and maternal mortality worldwide, based on WHO, UNICEF, and UN IGME 2024 data.",
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
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
