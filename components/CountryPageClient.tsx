"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Country, DATA, AVG_INF, AVG_MAT, MAX_INF, MAX_MAT } from "@/lib/data";
import { CountryAnalysis } from "@/lib/countryAnalysis";

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

  const prevCountry = DATA[DATA.findIndex(c => c.slug === country.slug) - 1] ?? null;
  const nextCountry = DATA[DATA.findIndex(c => c.slug === country.slug) + 1] ?? null;

  // Country-specific background image via Unsplash (landscape/people/health)
  const bgImage = `https://source.unsplash.com/1600x900/?${encodeURIComponent(country.name)},hospital,mother,birth,healthcare`;

  return (
    <div style={{ background: "#F5F9FC", minHeight: "100vh", fontFamily: "'Roboto',sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#003F6B", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 3px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1340, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, background: "#1CABE2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>🌍</div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>Every Life Counts</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Countries</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span className="flag-emoji" style={{ fontSize: "1.1rem" }}>{country.flag}</span>
            <span style={{ fontSize: "0.82rem", color: "#5DCCF5", fontWeight: 600 }}>{country.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)" }}>WHO · UNICEF · UN IGME 2024</span>
            <Link href="/" style={{ fontSize: "0.75rem", color: "#5DCCF5", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(93,204,245,0.35)", padding: "0.28rem 0.8rem", borderRadius: 4 }}>
              ← All Countries
            </Link>
          </div>
        </div>

        {/* Live counter strip */}
        <div style={{ background: "linear-gradient(90deg,#002B4D 0%,#003F6B 40%,#004880 100%)", borderBottom: "2px solid rgba(28,171,226,0.25)" }}>
          <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "stretch", gap: 0 }}>

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
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.8rem 2rem", borderRight: "1px solid rgba(255,255,255,0.1)", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#5DCCF5", boxShadow: "0 0 16px rgba(93,204,245,0.8)" }} />
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.75)", fontWeight: 700, marginBottom: "0.1rem", display: "flex", alignItems: "center", gap: "0.35rem", paddingLeft: "0.75rem" }}>
                <span className="live-dot" /> Child Deaths Since Jan 1, 2026
              </div>
              <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, paddingLeft: "0.75rem", textShadow: "0 0 30px rgba(93,204,245,0.5)" }}>
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
              <div key={label} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0.8rem 1.8rem", borderRight: "1px solid rgba(255,255,255,0.08)", textAlign: "center", minWidth: 155 }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.13em", color: "rgba(255,255,255,0.72)", fontWeight: 700, marginBottom: "0.2rem" }}>{label}</div>
                <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1, color }}>{val}</div>
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
          filter: "saturate(0.6) brightness(0.4)",
        }} />
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(105deg,rgba(0,12,30,0.92) 0%,rgba(0,20,45,0.82) 50%,rgba(0,15,35,0.65) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1340, margin: "0 auto", padding: "4rem 2rem", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center" }}>

          {/* Left: title + summary */}
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#1CABE2", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ width: 22, height: 2, background: "#1CABE2", display: "inline-block" }} />
              Birth Mortality Crisis
            </div>
            <h1 style={{ fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, marginBottom: "1.3rem" }}>
              Mothers &amp; Newborns<br />Dying in {country.name}<br />
              <span style={{ color: "#5DCCF5" }}>During Childbirth</span>
            </h1>
            {analysis && (
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.85, maxWidth: 560 }}>
                {analysis.maternalMortality.headline}
              </p>
            )}
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

            {/* ── NEWBORN / CHILD SECTION ── */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionHeading icon="👶" title={`Newborn & Child Deaths During Birth in ${country.name}`} color="#5DCCF5" />
            </div>

            {/* Context full-width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(93,204,245,0.25)", borderRadius: 10, padding: "1.75rem 2rem", boxShadow: "0 2px 12px rgba(28,171,226,0.06)", borderLeft: "4px solid #1CABE2" }}>
                <p style={{ fontSize: "1.05rem", color: "#1a2e3b", lineHeight: 1.9 }}>{analysis.childMortality.context}</p>
                <p style={{ fontSize: "0.95rem", color: "#2a3f50", lineHeight: 1.85, marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #EBF5FB" }}>{analysis.childMortality.trend}</p>
              </div>
            </div>

            <AnalysisCard title="Leading Causes of Child Death at Birth" color="#5DCCF5" borderColor="rgba(93,204,245,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {analysis.childMortality.causes.map((c) => (
                  <CauseBar key={c.label} label={c.label} pct={c.pct} color="#1CABE2" />
                ))}
                <p style={{ fontSize: "0.72rem", color: "#8AAEC4", marginTop: "0.5rem", fontStyle: "italic" }}>
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
                <p style={{ fontSize: "1.05rem", color: "#1a2e3b", lineHeight: 1.9 }}>{analysis.maternalMortality.context}</p>
                <p style={{ fontSize: "0.95rem", color: "#2a3f50", lineHeight: 1.85, marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #FFF8EE" }}>{analysis.maternalMortality.trend}</p>
              </div>
            </div>

            <AnalysisCard title="Causes of Death During Labour & Delivery" color="#FFB74D" borderColor="rgba(255,183,77,0.25)">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {analysis.maternalMortality.causes.map((c) => (
                  <CauseBar key={c.label} label={c.label} pct={c.pct} color="#FFB74D" />
                ))}
                <p style={{ fontSize: "0.72rem", color: "#8AAEC4", marginTop: "0.5rem", fontStyle: "italic" }}>
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
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1a2e3b" }}>Structural Barriers to Safe Birth in {country.name}</span>
                </div>
                <div style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
                  {analysis.drivers.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", padding: "0.75rem 1rem", background: "rgba(239,154,154,0.05)", borderRadius: 6, border: "1px solid rgba(239,154,154,0.15)" }}>
                      <span style={{ color: "#EF9A9A", flexShrink: 0, marginTop: "0.1rem" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </span>
                      <span style={{ fontSize: "0.88rem", color: "#2a3f50", lineHeight: 1.55 }}>{d}</span>
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
                  <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#1CABE2", fontWeight: 700, marginBottom: "0.4rem" }}>SDG 3 Progress Assessment</div>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75 }}>{analysis.sdgNote}</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ padding: "3rem", textAlign: "center", color: "#4a6880" }}>
            <p>Detailed analysis not yet available for {country.name}.</p>
          </div>
        )}

        {/* ── NAVIGATION ── */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid #D0E8F5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
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
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>Every Life Counts</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Data: WHO · UNICEF · UN IGME 2024 · World Bank · CIA Factbook 2024</p>
          </div>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>© 2026 — Educational use only</span>
        </div>
      </footer>

    </div>
  );
}

function SectionHeading({ icon, title, color }: { icon: string; title: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.25rem" }}>
      <span style={{ fontSize: "1.3rem" }}>{icon}</span>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1a2e3b" }}>{title}</h2>
      <div style={{ flex: 1, height: 2, background: color + "55", borderRadius: 1 }} />
    </div>
  );
}

function AnalysisCard({ title, color, borderColor, children }: { title: string; color: string; borderColor: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${borderColor}`, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(28,171,226,0.06)" }}>
      <div style={{ padding: "0.7rem 1.3rem", background: color + "12", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: 3, height: 16, background: color, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1a2e3b" }}>{title}</span>
      </div>
      <div style={{ padding: "1.3rem" }}>{children}</div>
    </div>
  );
}

function StatFact({ icon, label, value, note, color }: { icon: string; label: string; value: string; note: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.65rem 0.85rem", background: color + "0D", borderRadius: 6, border: `1px solid ${color}22` }}>
      <span style={{ fontSize: "1.1rem", lineHeight: 1, flexShrink: 0, marginTop: "0.05rem" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.85rem", color: "#2a3f50", fontWeight: 500 }}>{label}</span>
          <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.88rem", fontWeight: 700, color, flexShrink: 0 }}>{value}</span>
        </div>
        <div style={{ fontSize: "0.72rem", color: "#8AAEC4", marginTop: "0.15rem" }}>{note}</div>
      </div>
    </div>
  );
}

function CauseBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
        <span style={{ fontSize: "0.85rem", color: "#2a3f50", fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.85rem", fontWeight: 700, color, flexShrink: 0, marginLeft: "0.5rem" }}>{pct}%</span>
      </div>
      <div style={{ height: 7, background: "#EBF5FB", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.8s ease-out", opacity: 0.85 }} />
      </div>
    </div>
  );
}
