"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { DATA } from "@/lib/data";

// Estimated annual child deaths per country (infant rate × estimated births)
// births proxy: maternal rate gives country-scale, we use a fixed births estimate per country
// These are approximate order-of-magnitude figures for display
const BIRTHS_ESTIMATE: Record<string, number> = {
  afghanistan: 1_200_000,
  mali: 700_000,
  somalia: 500_000,
  "central-african-rep": 180_000,
  chad: 650_000,
  "sierra-leone": 180_000,
  niger: 900_000,
  guinea: 380_000,
  "south-sudan": 310_000,
  nigeria: 7_200_000,
  "guinea-bissau": 70_000,
  lesotho: 50_000,
  mozambique: 700_000,
  "burkina-faso": 650_000,
  angola: 1_000_000,
  benin: 390_000,
  mauritania: 150_000,
  cameroon: 850_000,
  "cote-divoire": 900_000,
  "dr-congo": 3_200_000,
  liberia: 120_000,
  uganda: 1_500_000,
  "equatorial-guinea": 25_000,
  tanzania: 1_900_000,
  "rep-of-congo": 190_000,
  ethiopia: 3_000_000,
  madagascar: 800_000,
  malawi: 600_000,
  sudan: 1_100_000,
  haiti: 200_000,
};

function formatDeaths(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return n.toLocaleString();
}

export default function CountryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 2200);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);
    return () => {
      stopAutoplay();
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  // Build items — duplicate the list so the loop feels seamless
  const items = [...DATA, ...DATA];

  return (
    <div style={{ width: "100%", background: "linear-gradient(180deg,#F5F9FC 0%,#EBF5FB 100%)", padding: "3rem 0 3.5rem", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem", marginBottom: "2rem" }}>
        <div className="carousel-header" style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#1CABE2", marginBottom: "0.3rem" }}>30 Highest-Mortality Countries</div>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#1a2e3b", fontFamily: "'Montserrat',sans-serif", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Countries Where Children Pay With Their Lives
            </h2>
          </div>
          <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,rgba(28,171,226,0.35),transparent)", borderRadius: 1, marginLeft: "1rem" }} />
          <Link href="#rankings" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1CABE2", textDecoration: "none", border: "1.5px solid rgba(28,171,226,0.35)", padding: "0.45rem 1rem", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
            See Full Rankings ↓
          </Link>
        </div>
      </div>

      {/* Embla viewport */}
      <div
        ref={emblaRef}
        style={{ overflow: "hidden", cursor: "grab" }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div style={{ display: "flex", gap: 0 }}>
          {items.map((country, idx) => {
            const births = BIRTHS_ESTIMATE[country.slug] ?? 500_000;
            const annualChildDeaths = Math.round((country.infant / 1000) * births);
            const annualMaternalDeaths = Math.round((country.maternal / 100000) * births);
            const flagUrl = `https://flagcdn.com/w640/${country.iso2}.png`;

            return (
              <div
                key={`${country.slug}-${idx}`}
                style={{ flex: "0 0 260px", paddingLeft: "1rem", paddingRight: 0 }}
              >
                <Link href={`/country/${country.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{
                    background: "#fff",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(28,171,226,0.15)",
                    boxShadow: "0 2px 16px rgba(28,171,226,0.07)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    position: "relative",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(28,171,226,0.18)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(28,171,226,0.07)";
                    }}
                  >
                    {/* Flag as full card image */}
                    <div style={{ position: "relative", height: 160, overflow: "hidden", background: "#e8eef3" }}>
                      <img
                        src={flagUrl}
                        alt={`Flag of ${country.name}`}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* Region pill */}
                      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,20,40,0.62)", backdropFilter: "blur(4px)", padding: "0.18rem 0.55rem", borderRadius: 20, fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {country.region}
                      </div>
                      {/* Subtle bottom fade into card body */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, background: "linear-gradient(to top,rgba(255,255,255,0.9),transparent)" }} />
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "0.9rem 1rem 1rem" }}>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", fontWeight: 800, color: "#1a2e3b", marginBottom: "0.6rem", lineHeight: 1.2 }}>{country.name}</div>

                      {/* Deaths stat */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.9rem" }}>👶</span>
                        <div>
                          <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.35rem", fontWeight: 900, color: "#C0392B", lineHeight: 1 }}>{formatDeaths(annualChildDeaths)}</span>
                          <span style={{ fontSize: "0.8rem", color: "#1a2e3b", fontWeight: 600, marginLeft: "0.4rem" }}>child deaths/yr</span>
                        </div>
                      </div>

                      {/* Infant rate bar */}
                      <div style={{ marginBottom: "0.6rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#1a2e3b", fontWeight: 600, marginBottom: "0.25rem" }}>
                          <span>Infant mortality rate</span>
                          <span style={{ fontFamily: "'Roboto Mono',monospace", fontWeight: 700, color: "#C0392B" }}>{country.infant.toFixed(1)} / 1k</span>
                        </div>
                        <div style={{ height: 5, background: "#EBF5FB", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((country.infant / 105) * 100, 100)}%`, background: "linear-gradient(90deg,#E67E22,#C0392B)", borderRadius: 2 }} />
                        </div>
                      </div>

                      {/* Maternal deaths */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #D0E8F5" }}>
                        <span style={{ fontSize: "0.78rem", color: "#1a2e3b", fontWeight: 600 }}>🤱 Maternal deaths/yr</span>
                        <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.9rem", fontWeight: 700, color: "#E67E22" }}>{formatDeaths(annualMaternalDeaths)}</span>
                      </div>

                      {/* CTA */}
                      <div style={{ marginTop: "0.8rem", fontSize: "0.82rem", fontWeight: 700, color: "#1CABE2", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        View full analysis
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ maxWidth: 1340, margin: "1rem auto 0", padding: "0 2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8AAEC4" strokeWidth="2"><path d="M5 9l7-7 7 7M5 15l7 7 7-7" /></svg>
        <span style={{ fontSize: "0.68rem", color: "#8AAEC4" }}>Drag to explore · Click any card to see full country analysis</span>
      </div>
    </div>
  );
}
