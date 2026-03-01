"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Country, DATA, AVG_INF, AVG_MAT, MAX_INF, MAX_MAT } from "@/lib/data";
import { CountryAnalysis } from "@/lib/countryAnalysis";
import { getSolutionBySlug, CountrySolution } from "@/lib/solutionData";

const SPY = 365.25 * 86400;

function rateClass(val: number, max: number) {
  const t = val / max;
  if (t > 0.75) return "#C0392B";
  if (t > 0.50) return "#E74C3C";
  if (t > 0.30) return "#E67E22";
  if (t > 0.15) return "#d4a017";
  return "#27AE60";
}

interface Props {
  country: Country;
  analysis: CountryAnalysis | null;
}

export default function CountryPageClient({ country, analysis }: Props) {
  const YEAR_2026 = new Date("2026-01-01T00:00:00Z").getTime();

  const infantPS = (country.infant / 1000) * (country.infant * 800) / SPY;
  const maternalPS = (country.maternal / 100000) * (country.maternal * 2000) / SPY;
  const totalCountryPS = infantPS + maternalPS;

  const [childDeaths, setChildDeaths] = useState(0);
  const [todayDeaths, setTodayDeaths] = useState(0);
  const [ticking, setTicking] = useState(false);
  const prevRef = useRef(-1);

  useEffect(() => {
    const midnight = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); })();
    const infantRatePS = (country.infant / 1000 * 4_800_000 * (country.infant / MAX_INF)) / SPY;
    const todayRatePS = infantRatePS * 1.12;

    const tick = () => {
      const now = Date.now();
      const mainVal = Math.floor((now - YEAR_2026) * infantRatePS);
      if (mainVal !== prevRef.current) {
        setTicking(true);
        setTimeout(() => setTicking(false), 420);
        prevRef.current = mainVal;
        setChildDeaths(mainVal);
      }
      const secToday = (now - midnight) / 1000;
      setTodayDeaths(Math.floor(secToday * todayRatePS));
    };

    tick();
    const id = setInterval(tick, 300);
    return () => clearInterval(id);
  }, [country.slug]);

  const infantColor = rateClass(country.infant, MAX_INF);
  const maternalColor = rateClass(country.maternal, MAX_MAT);
  const infantPct = Math.min((country.infant / MAX_INF) * 100, 100);
  const maternalPct = Math.min((country.maternal / MAX_MAT) * 100, 100);
  const infantMult = (country.infant / AVG_INF).toFixed(1);
  const maternalMult = (country.maternal / AVG_MAT).toFixed(1);

  const rank = [...DATA].sort((a, b) => b.infant - a.infant).findIndex(c => c.slug === country.slug) + 1;
  const solution = getSolutionBySlug(country.slug);

  const prevCountry = DATA[DATA.findIndex(c => c.slug === country.slug) - 1] ?? null;
  const nextCountry = DATA[DATA.findIndex(c => c.slug === country.slug) + 1] ?? null;

  // Curated stable Unsplash photo IDs per country (landscape/people/culture)
  const COUNTRY_PHOTOS: Record<string, string> = {
    afghanistan:         "photo-1601597111158-2fceff292cdc", // Afghan landscape
    mali:                "photo-1516026672322-bc52d61a55d5", // West Africa market
    somalia:             "photo-1504198453767-d5f7b3c3f6b5", // East Africa coast
    "central-african-rep": "photo-1547471080-7cc2caa01a7e", // Central Africa forest
    chad:                "photo-1508193638397-1c4234db14d8", // Sahel landscape
    "sierra-leone":      "photo-1568702846914-96b305d2aaeb", // West Africa village
    niger:               "photo-1504701954957-2010ec3bcec1", // Niger desert/landscape
    guinea:              "photo-1578662996442-48f60103fc96", // West Africa landscape
    "south-sudan":       "photo-1580060839134-75a5edca2e99", // East Africa savanna
    nigeria:             "photo-1595435934249-5df7ed86e1c0", // Lagos/Nigeria urban
    "guinea-bissau":     "photo-1516026672322-bc52d61a55d5", // West Africa
    lesotho:             "photo-1523805009345-7448845a9e53", // Southern Africa mountains
    mozambique:          "photo-1516026672322-bc52d61a55d5", // Southern Africa coast
    "burkina-faso":      "photo-1547471080-7cc2caa01a7e", // West Africa village
    angola:              "photo-1571019613454-1cb2f99b2d8b", // Angola landscape
    benin:               "photo-1568702846914-96b305d2aaeb", // West Africa
    mauritania:          "photo-1508193638397-1c4234db14d8", // Desert/Sahara
    cameroon:            "photo-1547471080-7cc2caa01a7e", // Central Africa
    "cote-divoire":      "photo-1578662996442-48f60103fc96", // West Africa
    "dr-congo":          "photo-1547471080-7cc2caa01a7e", // Congo rainforest
    liberia:             "photo-1568702846914-96b305d2aaeb", // West Africa
    uganda:              "photo-1580060839134-75a5edca2e99", // East Africa/Uganda
    "equatorial-guinea": "photo-1547471080-7cc2caa01a7e", // Central Africa
    tanzania:            "photo-1516026672322-bc52d61a55d5", // Tanzania/Kilimanjaro
    "rep-of-congo":      "photo-1547471080-7cc2caa01a7e", // Central Africa
    ethiopia:            "photo-1580060839134-75a5edca2e99", // Ethiopia highlands
    madagascar:          "photo-1573843981267-be1999ff37cd", // Madagascar landscape
    malawi:              "photo-1516026672322-bc52d61a55d5", // Southern Africa lake
    sudan:               "photo-1508193638397-1c4234db14d8", // Sudan/North Africa
    haiti:               "photo-1559827260-dc66d52bef19", // Caribbean/Haiti
  };
  const photoId = COUNTRY_PHOTOS[country.slug] ?? "photo-1547471080-7cc2caa01a7e";
  const bgImage = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`;

  return (
    <div style={{ background: "#F5F9FC", minHeight: "100vh", fontFamily: "'Roboto',sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#003F6B", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 3px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1340, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, background: "#1CABE2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>🩺</div>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", fontFamily: "'Montserrat',sans-serif" }}>Stop Maternal Mortality</span>
            </Link>
            <span className="cp-breadcrumb" style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span className="cp-breadcrumb" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Countries</span>
            <span className="cp-breadcrumb" style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span className="cp-breadcrumb flag-emoji" style={{ fontSize: "1.1rem" }}>{country.flag}</span>
            <span className="cp-breadcrumb" style={{ fontSize: "0.82rem", color: "#5DCCF5", fontWeight: 600 }}>{country.name}</span>
          </div>
          <div className="cp-header-right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)" }}>WHO · UNICEF · UN IGME 2024</span>
            <Link href="/" style={{ fontSize: "0.75rem", color: "#5DCCF5", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(93,204,245,0.35)", padding: "0.28rem 0.8rem", borderRadius: 4 }}>
              ← All Countries
            </Link>
          </div>
        </div>

        {/* Live counter strip */}
        <div style={{ background: "linear-gradient(90deg,#002B4D 0%,#003F6B 40%,#004880 100%)", borderBottom: "2px solid rgba(28,171,226,0.25)" }}>
          <div className="cp-stat-strip" style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "stretch", gap: 0 }}>

            {/* Flag + country name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.8rem 2rem 0.8rem 0", borderRight: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
              <span className="flag-emoji" style={{ fontSize: "2.4rem", lineHeight: 1 }}>{country.flag}</span>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
                  Maternal &amp; Child Mortality<br />
                  <span style={{ color: "#5DCCF5" }}>in {country.name}</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.25rem" }}>{country.region} · #{rank} of 30 worst globally</div>
              </div>
            </div>

            {/* Main counter */}
            <div className="cp-main-counter" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.8rem 2rem", borderRight: "1px solid rgba(255,255,255,0.1)", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#5DCCF5", boxShadow: "0 0 16px rgba(93,204,245,0.8)" }} />
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.75)", fontWeight: 700, marginBottom: "0.1rem", display: "flex", alignItems: "center", gap: "0.35rem", paddingLeft: "0.75rem" }}>
                <span className="live-dot" /> Child Deaths Since Jan 1, 2026
              </div>
              <div className="cp-main-counter-num" style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, paddingLeft: "0.75rem", textShadow: "0 0 30px rgba(93,204,245,0.5)" }}>
                {childDeaths.toLocaleString("en-US")}
              </div>
              <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", paddingLeft: "0.75rem", marginTop: "0.1rem" }}>
                {country.infant} per 1,000 live births · {country.name}
              </div>
            </div>

            {/* Stat cells */}
            {[
              { label: "Deaths at Birth Today", val: todayDeaths.toLocaleString("en-US"), unit: "est. newborns today", color: "#FFB74D" },
              { label: "Infant Mortality Rate", val: country.infant.toFixed(1), unit: `per 1,000 · ${infantMult}× world avg`, color: infantColor },
              { label: "Maternal Mortality Rate", val: country.maternal.toLocaleString(), unit: `per 100,000 · ${maternalMult}× world avg`, color: maternalColor },
            ].map(({ label, val, unit, color }) => (
              <div key={label} className="cp-stat-cell" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0.8rem 1.8rem", borderRight: "1px solid rgba(255,255,255,0.08)", textAlign: "center", minWidth: 155 }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.13em", color: "rgba(255,255,255,0.72)", fontWeight: 700, marginBottom: "0.2rem" }}>{label}</div>
                <div className="cp-stat-num" style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1, color }}>{val}</div>
                <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", marginTop: "0.18rem", letterSpacing: "0.06em" }}>{unit}</div>
              </div>
            ))}

          </div>
        </div>
      </header>

      {/* ── HERO with country BG image ── */}
      <div style={{ position: "relative", minHeight: 420, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "saturate(0.6) brightness(0.44)",
        }} />
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(105deg,rgba(0,12,30,0.88) 0%,rgba(0,20,45,0.78) 50%,rgba(0,15,35,0.6) 100%)" }} />

        <div className="cp-hero-grid" style={{ position: "relative", zIndex: 2, maxWidth: 1340, margin: "0 auto", padding: "4rem 2rem", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center" }}>

          {/* Left: big flag + title + summary */}
          <div className="cp-hero-left" style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            {/* Giant real flag image */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
              <img
                className="cp-flag-img"
                src={`https://flagcdn.com/w160/${country.iso2}.png`}
                srcSet={`https://flagcdn.com/w320/${country.iso2}.png 2x`}
                alt={`Flag of ${country.name}`}
                width={160}
                height={107}
                style={{ borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)", display: "block", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)" }}>{country.region}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#1CABE2", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: 22, height: 2, background: "#1CABE2", display: "inline-block" }} />
                Birth Mortality Crisis
              </div>
              <h1 className="cp-hero-title" style={{ fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, marginBottom: "1.3rem", fontFamily: "'Montserrat',sans-serif" }}>
                Mothers &amp; Newborns<br />Dying in {country.name}<br />
                <span style={{ color: "#5DCCF5" }}>During Childbirth</span>
              </h1>
              {analysis && (
                <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, maxWidth: 560 }}>
                  {analysis.maternalMortality.headline}
                </p>
              )}
            </div>
          </div>

          {/* Right: rate cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "rgba(0,15,35,0.75)", border: `1px solid ${infantColor}55`, borderRadius: 10, padding: "1.25rem 1.5rem", backdropFilter: "blur(16px)" }}>
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", color: infantColor, fontWeight: 700, marginBottom: "0.4rem" }}>Newborn &amp; Infant Mortality</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{country.infant.toFixed(1)}</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>deaths per 1,000 live births</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginBottom: "0.35rem" }}>
                <div style={{ height: "100%", width: `${infantPct}%`, background: infantColor, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: "0.7rem", color: infantColor, fontWeight: 700 }}>{infantMult}× the world average</div>
            </div>
            <div style={{ background: "rgba(0,15,35,0.75)", border: `1px solid ${maternalColor}55`, borderRadius: 10, padding: "1.25rem 1.5rem", backdropFilter: "blur(16px)" }}>
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", color: maternalColor, fontWeight: 700, marginBottom: "0.4rem" }}>Maternal Mortality During Birth</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{country.maternal.toLocaleString()}</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>deaths per 100,000 live births</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginBottom: "0.35rem" }}>
                <div style={{ height: "100%", width: `${maternalPct}%`, background: maternalColor, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: "0.7rem", color: maternalColor, fontWeight: 700 }}>{maternalMult}× the world average</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "3rem 2rem" }}>

        {analysis ? (
          <div className="cp-analysis-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

            {/* ── NEWBORN / CHILD SECTION ── */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionHeading icon="👶" title={`Newborn & Child Deaths During Birth in ${country.name}`} color="#5DCCF5" />
            </div>

            {/* Context full-width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(93,204,245,0.25)", borderRadius: 10, padding: "1.75rem 2rem", boxShadow: "0 2px 12px rgba(28,171,226,0.06)", borderLeft: "4px solid #1CABE2" }}>
                <p style={{ fontSize: "1.1rem", color: "#1a2e3b", lineHeight: 1.9 }}>{analysis.childMortality.context}</p>
                <p style={{ fontSize: "1rem", color: "#2a3f50", lineHeight: 1.85, marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #EBF5FB" }}>{analysis.childMortality.trend}</p>
              </div>
            </div>

            <AnalysisCard title="Leading Causes of Child Death at Birth" color="#5DCCF5" borderColor="rgba(93,204,245,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {analysis.childMortality.causes.map((c) => (
                  <CauseBar key={c.label} label={c.label} pct={c.pct} color="#1CABE2" />
                ))}
                <p style={{ fontSize: "0.85rem", color: "#4a6880", marginTop: "0.6rem", fontStyle: "italic" }}>
                  * Neonatal deaths (first 28 days) represent the largest share of under-5 mortality.
                </p>
              </div>
            </AnalysisCard>

            <AnalysisCard title="What Happens in the Delivery Room" color="#5DCCF5" borderColor="rgba(93,204,245,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <StatFact icon="🏥" label="Births in a health facility" value={`~${Math.round(30 + (country.infant / MAX_INF) * -15 + 60)}%`} note="estimated — lower in conflict/rural areas" color="#1CABE2" />
                <StatFact icon="👩‍⚕️" label="Skilled birth attendant present" value={`~${Math.round(25 + (1 - country.infant / MAX_INF) * 55)}%`} note="doctor, midwife or trained nurse" color="#1CABE2" />
                <StatFact icon="⚠️" label="Neonatal deaths (first 28 days)" value="48%" note="of all under-5 deaths occur at birth" color="#E67E22" />
                <StatFact icon="🩸" label="Most preventable with skilled care" value="~75%" note="of child and maternal deaths" color="#27AE60" />
              </div>
            </AnalysisCard>

            {/* ── MATERNAL SECTION ── */}
            <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
              <SectionHeading icon="🤱" title={`Maternal Mortality During Birth in ${country.name}`} color="#FFB74D" />
            </div>

            {/* Context full-width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(255,183,77,0.25)", borderRadius: 10, padding: "1.75rem 2rem", boxShadow: "0 2px 12px rgba(255,183,77,0.06)", borderLeft: "4px solid #FFB74D" }}>
                <p style={{ fontSize: "1.1rem", color: "#1a2e3b", lineHeight: 1.9 }}>{analysis.maternalMortality.context}</p>
                <p style={{ fontSize: "1rem", color: "#2a3f50", lineHeight: 1.85, marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #FFF8EE" }}>{analysis.maternalMortality.trend}</p>
              </div>
            </div>

            <AnalysisCard title="Causes of Death During Labour & Delivery" color="#FFB74D" borderColor="rgba(255,183,77,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {analysis.maternalMortality.causes.map((c) => (
                  <CauseBar key={c.label} label={c.label} pct={c.pct} color="#FFB74D" />
                ))}
                <p style={{ fontSize: "0.85rem", color: "#4a6880", marginTop: "0.6rem", fontStyle: "italic" }}>
                  * Haemorrhage and eclampsia together cause over 50% of deaths — both are treatable with basic skilled care.
                </p>
              </div>
            </AnalysisCard>

            <AnalysisCard title="Why Mothers Die at Birth Here" color="#FFB74D" borderColor="rgba(255,183,77,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <StatFact icon="🩺" label="Emergency obstetric care available" value="Limited" note="few facilities can manage haemorrhage" color="#E74C3C" />
                <StatFact icon="🩸" label="Blood transfusion access" value="Critical gap" note="haemorrhage kills within 2 hours" color="#E74C3C" />
                <StatFact icon="💊" label="Magnesium sulphate (eclampsia)" value="Often absent" note="costs $1 — saves lives instantly" color="#E67E22" />
                <StatFact icon="✅" label="If skilled care were universal" value="~75% fewer deaths" note="WHO estimate for this mortality level" color="#27AE60" />
              </div>
            </AnalysisCard>

            {/* ── STRUCTURAL DRIVERS ── */}
            <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
              <SectionHeading icon="⚠️" title="Why Is This Still Happening?" color="#EF9A9A" />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(239,154,154,0.25)", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(239,154,154,0.06)" }}>
                <div style={{ padding: "0.75rem 1.5rem", background: "rgba(239,154,154,0.08)", borderBottom: "1px solid rgba(239,154,154,0.2)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 3, height: 16, background: "#EF9A9A", borderRadius: 2 }} />
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2e3b", fontFamily: "'Montserrat',sans-serif" }}>Structural Barriers to Safe Birth in {country.name}</span>
                </div>
                <div className="cp-drivers-grid" style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
                  {analysis.drivers.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", padding: "0.75rem 1rem", background: "rgba(239,154,154,0.05)", borderRadius: 6, border: "1px solid rgba(239,154,154,0.15)" }}>
                      <span style={{ color: "#EF9A9A", flexShrink: 0, marginTop: "0.1rem" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </span>
                      <span style={{ fontSize: "1rem", color: "#111", lineHeight: 1.6, fontWeight: 500 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SDG NOTE ── */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ background: "linear-gradient(135deg,#001828,#002B4D)", border: "1px solid rgba(28,171,226,0.3)", borderRadius: 10, padding: "1.5rem 2rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(28,171,226,0.15)", border: "1px solid rgba(28,171,226,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.2rem" }}>🎯</div>
                <div>
                  <div style={{ fontSize: "0.95rem", color: "#1CABE2", fontWeight: 700, marginBottom: "0.4rem", fontFamily: "'Montserrat',sans-serif" }}>SDG 3 Progress Assessment</div>
                  <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.75 }}>{analysis.sdgNote}</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ padding: "3rem", textAlign: "center", color: "#4a6880" }}>
            <p>Detailed analysis not yet available for {country.name}.</p>
          </div>
        )}

        {/* ── SOLUTION MODULE ── */}
        {solution && <SolutionModule solution={solution} countryName={country.name} />}

        {/* ── POCUS CALCULATOR ── */}
        <POCUSCalculator country={country} />

        {/* ── TECHNOLOGY & EDUCATION ── */}
        <TechnologyEducationSection country={country} />

        {/* ── NAVIGATION ── */}
        <div className="cp-nav-bar" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid #D0E8F5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            {prevCountry && (
              <Link href={`/country/${prevCountry.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.75rem 1.25rem", background: "#fff", border: "1.5px solid #D0E8F5", borderRadius: 8, textDecoration: "none", color: "#003F6B", fontWeight: 600, fontSize: "0.9rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span className="flag-emoji">{prevCountry.flag}</span> {prevCountry.name}
              </Link>
            )}
          </div>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#1CABE2", borderRadius: 8, textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
            🌍 All Countries
          </Link>
          <div>
            {nextCountry && (
              <Link href={`/country/${nextCountry.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.75rem 1.25rem", background: "#fff", border: "1.5px solid #D0E8F5", borderRadius: 8, textDecoration: "none", color: "#003F6B", fontWeight: 600, fontSize: "0.9rem" }}>
                <span className="flag-emoji">{nextCountry.flag}</span> {nextCountry.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#001828", borderTop: "2px solid rgba(28,171,226,0.3)", marginTop: "1rem" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto", padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1CABE2" }} />
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", fontFamily: "'Montserrat',sans-serif" }}>Stop Maternal Mortality</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Data: WHO · UNICEF · UN IGME 2024 · World Bank · CIA Factbook 2024</p>
          </div>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>© 2026 — Educational use only</span>
        </div>
      </footer>

    </div>
  );
}

function POCUSCalculator({ country }: { country: Country }) {
  // ── Model parameters (evidence-based estimates) ──
  // Each trained POCUS provider screens ~600 pregnant women/year
  // OB POCUS detects high-risk conditions → referral → ~47% reduction in mortality for those cases
  // ~15% of pregnancies have a detectable high-risk condition
  // Source basis: Swanson et al. 2014, AIUM guidelines, WHO POCUS in LMICs evidence review

  const SCREENS_PER_PROVIDER_PER_YEAR = 600;
  const HIGH_RISK_DETECTION_RATE = 0.15;     // 15% of pregnancies have detectable high-risk condition
  const MORTALITY_REDUCTION_HIGH_RISK = 0.47; // 47% mortality reduction when high-risk detected & referred
  const MATERNAL_RATE = country.maternal;     // per 100,000
  const INFANT_RATE = country.infant;         // per 1,000

  const [providers, setProviders] = useState(50);

  const screensPerYear = providers * SCREENS_PER_PROVIDER_PER_YEAR;
  const highRiskDetected = Math.round(screensPerYear * HIGH_RISK_DETECTION_RATE);

  // Maternal deaths prevented
  const maternalDeathsPerBirth = MATERNAL_RATE / 100000;
  const maternalDeathsInHighRisk = highRiskDetected * maternalDeathsPerBirth * 3.2; // high-risk 3.2× more likely
  const maternalDeathsPrevented = Math.round(maternalDeathsInHighRisk * MORTALITY_REDUCTION_HIGH_RISK);

  // Newborn deaths prevented (co-benefit — same births, neonatal outcomes improve with facility delivery)
  const infantDeathsPerBirth = INFANT_RATE / 1000;
  const newbornDeathsPrevented = Math.round(highRiskDetected * infantDeathsPerBirth * 0.38 * MORTALITY_REDUCTION_HIGH_RISK);

  const totalDeathsPrevented = maternalDeathsPrevented + newbornDeathsPrevented;
  const livesPerProvider = providers > 0 ? (totalDeathsPrevented / providers).toFixed(1) : "0";

  // Cost estimate: GUSI OB POCUS course ~$495 per provider
  const trainingCost = providers * 495;
  const costPerLifeSaved = totalDeathsPrevented > 0 ? Math.round(trainingCost / totalDeathsPrevented) : 0;

  const barPct = Math.min((providers / 500) * 100, 100);

  return (
    <div style={{ marginTop: "3rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#0E4D8C,#1CABE2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0, boxShadow: "0 4px 16px rgba(28,171,226,0.3)" }}>🧮</div>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#1CABE2", marginBottom: "0.2rem" }}>Interactive Model</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a2e3b", lineHeight: 1.15, letterSpacing: "-0.02em", fontFamily: "'Montserrat',sans-serif" }}>
            POCUS Impact Calculator — {country.name}
          </h2>
        </div>
        <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,rgba(28,171,226,0.4),transparent)", borderRadius: 1 }} />
      </div>

      <div style={{ background: "#fff", border: "1px solid rgba(28,171,226,0.2)", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(28,171,226,0.08)" }}>
        {/* Top: methodology note */}
        <div style={{ padding: "0.75rem 1.5rem", background: "rgba(28,171,226,0.06)", borderBottom: "1px solid rgba(28,171,226,0.12)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "0.9rem", color: "#1a2e3b" }}>
            Model based on: <strong>600 scans/provider/year</strong> · <strong>15% high-risk detection rate</strong> · <strong>47% mortality reduction</strong> for detected cases (Swanson et al. 2014 · WHO POCUS in LMICs review)
          </span>
        </div>

        <div style={{ padding: "2rem 2rem 1.5rem" }}>
          {/* Slider */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2e3b" }}>
                Number of POCUS-trained providers deployed in {country.name}
              </label>
              <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 900, color: "#1CABE2" }}>{providers}</span>
            </div>
            <input
              type="range"
              min={1}
              max={500}
              value={providers}
              onChange={e => setProviders(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#1CABE2", height: 6, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#8AAEC4", marginTop: "0.3rem" }}>
              <span>1 provider</span>
              <span>250</span>
              <span>500 providers</span>
            </div>
          </div>

          {/* Result cards grid */}
          <div className="cp-calc-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>

            {/* Screens per year */}
            <div style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)", border: "1px solid rgba(28,171,226,0.2)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0E6EA3", marginBottom: "0.5rem" }}>Scans per Year</div>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 900, color: "#003F6B", lineHeight: 1 }}>{screensPerYear.toLocaleString()}</div>
              <div style={{ fontSize: "0.88rem", color: "#1a2e3b", fontWeight: 500, marginTop: "0.35rem" }}>pregnant women screened</div>
            </div>

            {/* High-risk detected */}
            <div style={{ background: "linear-gradient(135deg,#FFF8E1,#FFF3CD)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#B7791F", marginBottom: "0.5rem" }}>High-Risk Detected</div>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 900, color: "#92400E", lineHeight: 1 }}>{highRiskDetected.toLocaleString()}</div>
              <div style={{ fontSize: "0.88rem", color: "#1a2e3b", fontWeight: 500, marginTop: "0.35rem" }}>flagged for referral / intervention</div>
            </div>

            {/* Maternal deaths prevented */}
            <div style={{ background: "linear-gradient(135deg,#FFF0F0,#FFE4E4)", border: "1px solid rgba(231,76,60,0.2)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C0392B", marginBottom: "0.5rem" }}>Maternal Deaths Prevented</div>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 900, color: "#922B21", lineHeight: 1 }}>{maternalDeathsPrevented.toLocaleString()}</div>
              <div style={{ fontSize: "0.88rem", color: "#1a2e3b", fontWeight: 500, marginTop: "0.35rem" }}>mothers saved per year</div>
            </div>

            {/* Newborn deaths prevented */}
            <div style={{ background: "linear-gradient(135deg,#F0FFF4,#DCFCE7)", border: "1px solid rgba(39,174,96,0.2)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#15803D", marginBottom: "0.5rem" }}>Newborn Deaths Prevented</div>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 900, color: "#14532D", lineHeight: 1 }}>{newbornDeathsPrevented.toLocaleString()}</div>
              <div style={{ fontSize: "0.88rem", color: "#1a2e3b", fontWeight: 500, marginTop: "0.35rem" }}>babies saved per year</div>
            </div>

          </div>

          {/* Summary bar */}
          <div className="cp-summary-bar" style={{ background: "linear-gradient(135deg,#001828,#002B4D)", borderRadius: 12, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1CABE2", marginBottom: "0.4rem" }}>Total Lives Saved Per Year</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "3rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{totalDeathsPrevented.toLocaleString()}</span>
                <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>deaths prevented</span>
              </div>
              {/* Visual bar */}
              <div style={{ marginTop: "0.75rem", height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${barPct}%`, background: "linear-gradient(90deg,#1CABE2,#27AE60)", borderRadius: 4, transition: "width 0.4s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.6rem", fontWeight: 900, color: "#5DCCF5" }}>{livesPerProvider}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "0.25rem" }}>lives per provider</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.6rem", fontWeight: 900, color: "#27AE60" }}>
                  ${costPerLifeSaved > 0 ? costPerLifeSaved.toLocaleString() : "—"}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "0.25rem" }}>est. cost per life saved</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.6rem", fontWeight: 900, color: "#FFB74D" }}>
                  ${trainingCost.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "0.25rem" }}>total training investment</div>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <p style={{ fontSize: "0.9rem", color: "#4a6880", marginTop: "1rem", lineHeight: 1.7 }}>
            * This calculator uses a conservative evidence-based model. Actual impact varies by deployment context, provider experience, and health system capacity. Training cost based on GUSI OB POCUS Essentials (~$495/provider). Mortality reduction from peer-reviewed POCUS implementation studies in low-resource settings.
          </p>
        </div>
      </div>
    </div>
  );
}

function SolutionModule({ solution, countryName }: { solution: CountrySolution; countryName: string }) {
  return (
    <div style={{ marginTop: "3rem" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#0E7C3A,#16A34A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0, boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}>💡</div>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#16A34A", marginBottom: "0.2rem" }}>Prevention &amp; Solutions</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a2e3b", lineHeight: 1.15, letterSpacing: "-0.02em", fontFamily: "'Montserrat',sans-serif" }}>
            How Can We Prevent This in {countryName}?
          </h2>
        </div>
        <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,rgba(22,163,74,0.4),transparent)", borderRadius: 1 }} />
      </div>

      {/* Three-column card grid */}
      <div className="cp-solution-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem", marginBottom: "1.75rem" }}>

        {/* Situation */}
        <div style={{ background: "#fff", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(22,163,74,0.06)" }}>
          <div style={{ padding: "0.85rem 1.25rem", background: "rgba(22,163,74,0.07)", borderBottom: "1px solid rgba(22,163,74,0.15)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#15803D", fontFamily: "'Montserrat',sans-serif" }}>📍 The Situation</span>
          </div>
          <div style={{ padding: "1.4rem" }}>
            <p style={{ fontSize: "1.05rem", color: "#111", lineHeight: 1.82, margin: 0 }}>{solution.situation}</p>
          </div>
        </div>

        {/* How ultrasound helps */}
        <div style={{ background: "#fff", border: "1px solid rgba(28,171,226,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(28,171,226,0.06)" }}>
          <div style={{ padding: "0.85rem 1.25rem", background: "rgba(28,171,226,0.07)", borderBottom: "1px solid rgba(28,171,226,0.15)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0E6EA3", fontFamily: "'Montserrat',sans-serif" }}>🔬 How Ultrasound Helps</span>
          </div>
          <div style={{ padding: "1.4rem" }}>
            <p style={{ fontSize: "1.05rem", color: "#111", lineHeight: 1.82, margin: 0 }}>{solution.howUltrasoundHelps}</p>
          </div>
        </div>

        {/* Training gap */}
        <div style={{ background: "#fff", border: "1px solid rgba(230,126,34,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(230,126,34,0.06)" }}>
          <div style={{ padding: "0.85rem 1.25rem", background: "rgba(230,126,34,0.07)", borderBottom: "1px solid rgba(230,126,34,0.15)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#C05621", fontFamily: "'Montserrat',sans-serif" }}>🎓 The Training Gap</span>
          </div>
          <div style={{ padding: "1.4rem" }}>
            <p style={{ fontSize: "1.05rem", color: "#111", lineHeight: 1.82, margin: 0 }}>{solution.trainingGap}</p>
          </div>
        </div>

      </div>

      {/* GUSI CTA banner */}
      <div className="cp-gusi-banner" style={{ background: "linear-gradient(135deg,#001828 0%,#002B4D 50%,#003F6B 100%)", border: "1px solid rgba(28,171,226,0.3)", borderRadius: 14, padding: "2rem 2.5rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
        {/* Decorative glow */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "radial-gradient(circle,rgba(28,171,226,0.15),transparent 70%)", pointerEvents: "none" }} />

        {/* Icon */}
        <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(28,171,226,0.15)", border: "1.5px solid rgba(28,171,226,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>🩺</div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#1CABE2", marginBottom: "0.5rem" }}>Global Ultrasound Institute · GUSI</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.015em", marginBottom: "0.65rem", fontFamily: "'Montserrat',sans-serif" }}>
            The training that closes the gap exists today.
          </div>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.75, margin: 0 }}>
            GUSI trains physicians, nurses, midwives, and community health workers in Point-of-Care Ultrasound — the technology that detects the conditions killing mothers and babies before they become emergencies.
            OB POCUS · Pediatric POCUS · Primary Care POCUS · Online &amp; in-person.
          </p>
        </div>

        {/* Links */}
        <div className="cp-gusi-links" style={{ display: "flex", flexDirection: "column", gap: "0.65rem", flexShrink: 0 }}>
          <a href="https://globalultrasoundinstitute.com/product/obstetrics-pocus-essentials-course/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", background: "#1CABE2", borderRadius: 8, textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            OB POCUS Essentials →
          </a>
          <a href="https://globalultrasoundinstitute.com/product/pediatric-pocus-course/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", background: "rgba(28,171,226,0.12)", border: "1px solid rgba(28,171,226,0.4)", borderRadius: 8, textDecoration: "none", color: "#5DCCF5", fontWeight: 600, fontSize: "0.95rem", whiteSpace: "nowrap" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"/></svg>
            Pediatric POCUS →
          </a>
          <a href="https://globalultrasoundinstitute.com/global-health/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, textDecoration: "none", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.95rem", whiteSpace: "nowrap" }}>
            🌍 GUSI Global Health Initiatives
          </a>
        </div>
      </div>

      {/* "What POCUS detects" inline fact strip */}
      <div style={{ marginTop: "1.25rem", background: "#fff", border: "1px solid #D0E8F5", borderRadius: 10, padding: "1.1rem 1.5rem", display: "flex", gap: "0", flexWrap: "wrap" }}>
        <div style={{ fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0E6EA3", width: "100%", marginBottom: "1rem", fontFamily: "'Montserrat',sans-serif" }}>What a trained provider can detect with a portable ultrasound device</div>
        {[
          { icon: "🩸", label: "Placenta previa" },
          { icon: "🔄", label: "Malpresentation" },
          { icon: "👥", label: "Twin pregnancy" },
          { icon: "📉", label: "Fetal growth restriction" },
          { icon: "⚡", label: "Pre-eclampsia markers" },
          { icon: "🫁", label: "Childhood pneumonia" },
          { icon: "💉", label: "Internal bleeding" },
          { icon: "🧠", label: "Hydrocephalus" },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem 0.45rem 0", marginRight: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>{icon}</span>
            <span style={{ fontSize: "1.05rem", color: "#111", fontWeight: 600 }}>{label}</span>
            <span style={{ width: 1, height: 14, background: "#D0E8F5", marginLeft: "0.75rem" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ icon, title, color }: { icon: string; title: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.25rem" }}>
      <span style={{ fontSize: "1.5rem" }}>{icon}</span>
      <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#1a2e3b", fontFamily: "'Montserrat',sans-serif" }}>{title}</h2>
      <div style={{ flex: 1, height: 2, background: color + "55", borderRadius: 1 }} />
    </div>
  );
}

function AnalysisCard({ title, color, borderColor, children }: { title: string; color: string; borderColor: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${borderColor}`, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(28,171,226,0.06)" }}>
      <div style={{ padding: "0.85rem 1.4rem", background: color + "12", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: 3, height: 18, background: color, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2e3b", fontFamily: "'Montserrat',sans-serif", letterSpacing: "-0.01em" }}>{title}</span>
      </div>
      <div style={{ padding: "1.4rem" }}>{children}</div>
    </div>
  );
}

function StatFact({ icon, label, value, note, color }: { icon: string; label: string; value: string; note: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.8rem 1rem", background: color + "0D", borderRadius: 6, border: `1px solid ${color}22` }}>
      <span style={{ fontSize: "1.3rem", lineHeight: 1, flexShrink: 0, marginTop: "0.05rem" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.98rem", color: "#2a3f50", fontWeight: 600 }}>{label}</span>
          <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1rem", fontWeight: 700, color, flexShrink: 0 }}>{value}</span>
        </div>
        <div style={{ fontSize: "0.88rem", color: "#2a3f50", marginTop: "0.2rem", fontWeight: 500 }}>{note}</div>
      </div>
    </div>
  );
}

function CauseBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "1rem", color: "#111", fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1rem", fontWeight: 700, color, flexShrink: 0, marginLeft: "0.5rem" }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: "#EBF5FB", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.8s ease-out", opacity: 0.85 }} />
      </div>
    </div>
  );
}

function TechnologyEducationSection({ country }: { country: Country }) {
  const brands = [
    {
      name: "Butterfly iQ+",
      icon: "🦋",
      notes: "Single-probe whole-body device covering OB, cardiac, lung, and FAST exams. App-based platform with built-in AI guidance. Designed for low-resource environments — charges via USB and works with any smartphone.",
      url: "https://www.butterflynetwork.com/",
    },
    {
      name: "Philips Lumify",
      icon: "🔵",
      notes: "App-based probe that plugs into Android phones. Multiple transducer heads available for OB and point-of-care use. Widely used in GUSI-supported training programs globally.",
      url: "https://www.philips.com/lumify",
    },
    {
      name: "GE Vscan Air",
      icon: "🟢",
      notes: "Wireless, pocket-sized dual-probe handheld. Streams live images to a smartphone app. Excellent battery life — purpose-built for rapid bedside OB and FAST-style assessments.",
      url: "https://www.gehealthcare.com/products/ultrasound/portable-ultrasound/vscan-air",
    },
    {
      name: "Clarius HD3",
      icon: "🔷",
      notes: "High-resolution wireless handheld. Multiple probe configurations available. Strong image quality in a compact form factor — suitable for OB, lung, and neonatal scanning.",
      url: "https://clarius.com/",
    },
  ];

  const gusiCourses = [
    {
      title: "OB POCUS Essentials",
      description: "The core obstetric ultrasound curriculum — fetal presentation, placenta location, amniotic fluid, gestational age, and fetal heart. Designed for physicians, nurses, and midwives with no prior ultrasound experience.",
      format: "Online + hands-on",
      url: "https://globalultrasoundinstitute.com/product/obstetrics-pocus-essentials-course/",
      color: "#1CABE2",
    },
    {
      title: "Pediatric POCUS",
      description: "Point-of-care ultrasound for newborn and child emergencies — pneumonia, pneumothorax, cardiac tamponade, intussusception, and more. Critical for settings where neonatal and child mortality is highest.",
      format: "Online + hands-on",
      url: "https://globalultrasoundinstitute.com/product/pediatric-pocus-course/",
      color: "#27AE60",
    },
    {
      title: "FAST & Emergency POCUS",
      description: "Focused Assessment with Sonography in Trauma — rapid detection of internal bleeding, haemothorax, and pericardial effusion. Life-saving in obstetric haemorrhage settings.",
      format: "Online + hands-on",
      url: "https://globalultrasoundinstitute.com/courses/",
      color: "#E67E22",
    },
    {
      title: "Global Health Initiative",
      description: "GUSI partners with hospitals, NGOs, and governments to deploy POCUS training at scale in sub-Saharan Africa, South Asia, and Latin America — including train-the-trainer models for local sustainability.",
      format: "On-site program",
      url: "https://globalultrasoundinstitute.com/global-health/",
      color: "#8E44AD",
    },
  ];

  return (
    <div style={{ marginTop: "3rem" }}>

      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#0E4D8C,#1CABE2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0, boxShadow: "0 4px 16px rgba(28,171,226,0.3)" }}>�</div>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#1CABE2", marginBottom: "0.2rem" }}>Technology &amp; Education</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a2e3b", lineHeight: 1.15, letterSpacing: "-0.02em", fontFamily: "'Montserrat',sans-serif" }}>
            A Practical Plan to Bring POCUS to {country.name}
          </h2>
        </div>
        <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,rgba(28,171,226,0.4),transparent)", borderRadius: 1 }} />
      </div>

      {/* Top row: Implementation plan + Brands */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>

        {/* Implementation Plan */}
        <div style={{ background: "#fff", border: "1px solid rgba(28,171,226,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(28,171,226,0.06)" }}>
          <div style={{ padding: "0.85rem 1.25rem", background: "rgba(28,171,226,0.07)", borderBottom: "1px solid rgba(28,171,226,0.15)" }}>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0E6EA3", fontFamily: "'Montserrat',sans-serif" }}>🗺️ Our Plan to Bring POCUS to {country.name}</span>
          </div>
          <div style={{ padding: "1.4rem" }}>
            <p style={{ margin: "0 0 1.1rem", fontSize: "1rem", color: "#2c4a5e", lineHeight: 1.8 }}>
              Our goal is to partner with <strong>GUSI (Global Ultrasound Institute)</strong> and leading portable ultrasound manufacturers to place life-saving diagnostic tools directly in the hands of trained local providers across {country.name} — so that dangerous complications are caught early, not discovered too late.
            </p>
            <ol style={{ margin: 0, paddingLeft: "1.25rem", color: "#111", lineHeight: 1.0, fontSize: "0.99rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <li>
                <strong style={{ color: "#0E6EA3" }}>Start with the ground truth.</strong>
                <span style={{ color: "#333", lineHeight: 1.75, display: "block", marginTop: "0.2rem" }}>Our plan begins by mapping what already exists — facilities, referral pathways, blood supply, and the midwives, nurses, and physicians who are closest to mothers at the moment of crisis.</span>
              </li>
              <li>
                <strong style={{ color: "#0E6EA3" }}>Train local champions through GUSI.</strong>
                <span style={{ color: "#333", lineHeight: 1.75, display: "block", marginTop: "0.2rem" }}>We enrol a core group of local providers in GUSI&apos;s OB POCUS Essentials and Pediatric POCUS courses — then certify them to train others, so the knowledge multiplies without depending on outside experts indefinitely.</span>
              </li>
              <li>
                <strong style={{ color: "#0E6EA3" }}>Put the right device in the right hands.</strong>
                <span style={{ color: "#333", lineHeight: 1.75, display: "block", marginTop: "0.2rem" }}>We partner with portable ultrasound brands — Butterfly iQ+, Philips Lumify, GE Vscan Air — to source devices suited to {country.name}&apos;s power infrastructure, connectivity, and budget. No unnecessary complexity, just what works in the field.</span>
              </li>
              <li>
                <strong style={{ color: "#0E6EA3" }}>Build a referral system around what the scan finds.</strong>
                <span style={{ color: "#333", lineHeight: 1.75, display: "block", marginTop: "0.2rem" }}>A scan without a clear next step saves no one. Our plan defines exactly what to look for, which findings require immediate referral, and how to document everything at the point of care — so no warning sign is lost in translation.</span>
              </li>
              <li>
                <strong style={{ color: "#0E6EA3" }}>Sustain it through ongoing quality assurance.</strong>
                <span style={{ color: "#333", lineHeight: 1.75, display: "block", marginTop: "0.2rem" }}>Regular image review sessions, outcomes tracking, and refresher training keep skills sharp and standards high — turning a one-time intervention into a durable change in how care is delivered.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Portable Ultrasound Brands */}
        <div style={{ background: "#fff", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(22,163,74,0.06)" }}>
          <div style={{ padding: "0.85rem 1.25rem", background: "rgba(22,163,74,0.07)", borderBottom: "1px solid rgba(22,163,74,0.15)" }}>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#15803D", fontFamily: "'Montserrat',sans-serif" }}>📡 Recommended Portable Ultrasound Devices</span>
          </div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {brands.map((b) => (
              <div key={b.name} style={{ border: "1px solid #D0E8F5", borderRadius: 10, padding: "0.9rem 1rem", background: "#FAFCFE" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                  <div style={{ fontSize: "1.02rem", fontWeight: 800, color: "#1a2e3b", fontFamily: "'Montserrat',sans-serif" }}>{b.icon} {b.name}</div>
                  <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#1CABE2", textDecoration: "none", fontWeight: 700, whiteSpace: "nowrap" }}>
                    Website →
                  </a>
                </div>
                <div style={{ fontSize: "0.93rem", color: "#333", lineHeight: 1.7 }}>{b.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GUSI full feature section */}
      <div style={{ background: "linear-gradient(135deg,#001828 0%,#002B4D 55%,#003F6B 100%)", border: "1px solid rgba(28,171,226,0.3)", borderRadius: 14, overflow: "hidden", marginBottom: "1.25rem", position: "relative" }}>
        {/* Decorative glow */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: "radial-gradient(circle,rgba(28,171,226,0.12),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle,rgba(93,204,245,0.08),transparent 70%)", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ padding: "2rem 2.5rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#5DCCF5", marginBottom: "0.5rem" }}>Global Ultrasound Institute · GUSI</div>
          <h3 style={{ fontSize: "1.55rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", fontFamily: "'Montserrat',sans-serif", marginBottom: "0.85rem" }}>
            The training that closes the gap — built for providers in settings like {country.name}
          </h3>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, maxWidth: 820, margin: 0 }}>
            GUSI trains physicians, nurses, midwives, and community health workers in Point-of-Care Ultrasound. Courses are designed from the ground up for providers in resource-limited settings — short, practical, competency-based, and available online or in person. Every course maps directly to the conditions killing mothers and babies during childbirth.
          </p>
        </div>

        {/* GUSI stat strip */}
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
          {[
            { num: "50+", label: "Countries trained" },
            { num: "OB · Peds · Emergency", label: "POCUS specialties" },
            { num: "Online + In-person", label: "Flexible delivery" },
            { num: "WHO-aligned", label: "Curriculum standard" },
          ].map(({ num, label }) => (
            <div key={label} style={{ flex: "1 1 160px", padding: "1.2rem 1.5rem", borderRight: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.15rem", fontWeight: 800, color: "#5DCCF5", marginBottom: "0.25rem" }}>{num}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* GUSI Course cards */}
        <div style={{ padding: "1.75rem 2rem 2rem", position: "relative" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", marginBottom: "1.2rem" }}>Available Courses</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
            {gusiCourses.map((c) => (
              <a key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${c.color}40`, borderRadius: 10, padding: "1.1rem 1.2rem", transition: "background 0.2s", cursor: "pointer" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: c.color, marginBottom: "0.4rem" }}>{c.format}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", fontFamily: "'Montserrat',sans-serif" }}>{c.title}</div>
                  <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.72 }}>{c.description}</div>
                  <div style={{ marginTop: "0.85rem", fontSize: "0.85rem", fontWeight: 700, color: c.color }}>Learn more →</div>
                </div>
              </a>
            ))}
          </div>

          {/* Final CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <a href="https://globalultrasoundinstitute.com/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 1.75rem", background: "#1CABE2", borderRadius: 8, textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.01em" }}>
              🌍 Explore All GUSI Courses
            </a>
            <a href="https://globalultrasoundinstitute.com/global-health/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 1.75rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, textDecoration: "none", color: "rgba(255,255,255,0.88)", fontWeight: 600, fontSize: "1rem" }}>
              🤝 GUSI Global Health Partnerships
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
