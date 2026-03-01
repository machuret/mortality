"use client";
import { useEffect, useRef, useState } from "react";

const YEAR_2026   = new Date("2026-01-01T00:00:00Z").getTime();
const CHILD_PY    = 4_800_000;
const MATERNAL_PY = 260_000;
const TOTAL_PY    = CHILD_PY + MATERNAL_PY;
const SPY         = 365.25 * 86400;
const cPS         = CHILD_PY    / SPY;
const mPS         = MATERNAL_PY / SPY;
const tPS         = TOTAL_PY    / SPY;

export default function Header() {
  const [main,   setMain]   = useState(0);
  const [today,  setToday]  = useState(0);
  const [child,  setChild]  = useState(0);
  const [mother, setMother] = useState(0);
  const [ticking, setTicking] = useState(false);
  const prevMain = useRef(-1);

  useEffect(() => {
    const midnight = (() => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime(); })();

    const tick = () => {
      const now = Date.now();
      const mainVal = Math.floor((now - YEAR_2026) / 6000);
      if (mainVal !== prevMain.current) {
        setTicking(true);
        setTimeout(() => setTicking(false), 420);
        prevMain.current = mainVal;
        setMain(mainVal);
      }
      const secToday = (now - midnight) / 1000;
      setToday(Math.floor(secToday * tPS));
      setChild(Math.floor(secToday * cPS));
      setMother(Math.floor(secToday * mPS));
    };

    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <header style={{ background: "#003F6B", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 3px 20px rgba(0,0,0,0.3)" }}>
      {/* Brand bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0.55rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1340, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 32, height: 32, background: "#1CABE2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, animation: "icon-pulse 2.5s ease-out infinite" }}>
            🩺
          </div>
          <div>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", fontFamily: "'Montserrat',sans-serif" }}>Stop Maternal Mortality</span>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", marginLeft: "0.6rem", fontWeight: 400 }}>stopmaternalmortality.com</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ fontSize: "0.62rem", color: "#4CAF50", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span className="live-dot" /> Live Estimates
          </div>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginLeft: "1rem", fontWeight: 500 }}>WHO · UNICEF · UN IGME 2024</span>
        </div>
      </div>

      {/* Counter strip */}
      <div style={{ background: "linear-gradient(90deg,#002B4D 0%,#003F6B 40%,#004880 100%)", borderBottom: "2px solid rgba(28,171,226,0.25)" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "stretch", gap: 0 }}>

          {/* Main ticker */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "1rem 2.5rem 1rem 0", borderRight: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#1CABE2", boxShadow: "0 0 16px rgba(28,171,226,0.8), 0 0 32px rgba(28,171,226,0.4)" }} />
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", fontWeight: 700, marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "0.4rem", paddingLeft: "1rem" }}>
              <span className="live-dot" /> Child Deaths Since Jan 1, 2026
            </div>
            <div className={`main-ticker-value${ticking ? " c-tick" : ""}`} style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "0.04em", paddingLeft: "1rem", textShadow: "0 0 40px rgba(28,171,226,0.6)" }}>
              {main.toLocaleString("en-US")}
            </div>
            <div className="main-ticker-sub" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: "0.04em", paddingLeft: "1rem", marginTop: "0.2rem" }}>
              +1 every 6 seconds · Based on 4.8M annual deaths (WHO/UNICEF 2023)
            </div>
          </div>

          {/* Secondary counters */}
          <div className="secondary-counters" style={{ flex: 1, display: "flex", alignItems: "stretch", justifyContent: "flex-end" }}>
            {[
              { label: "All Deaths Today", val: today, cls: "", unit: "children + mothers" },
              { label: "Children Today",   val: child,  cls: "child-c",  unit: "under age 5" },
              { label: "Mothers Today",    val: mother, cls: "mother-c", unit: "pregnancy-related" },
            ].map(({ label, val, cls, unit }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0.9rem 2rem", borderRight: "1px solid rgba(255,255,255,0.08)", textAlign: "center", minWidth: 155, position: "relative" }}>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.8)", fontWeight: 700, marginBottom: "0.3rem", whiteSpace: "nowrap" }}>{label}</div>
                <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2rem", fontWeight: 800, lineHeight: 1, letterSpacing: "0.03em", color: cls === "child-c" ? "#FFB74D" : cls === "mother-c" ? "#EF9A9A" : "rgba(255,255,255,0.9)", textShadow: cls === "child-c" ? "0 0 20px rgba(255,183,77,0.4)" : cls === "mother-c" ? "0 0 20px rgba(239,154,154,0.4)" : "none" }}>
                  {val.toLocaleString("en-US")}
                </div>
                <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem", fontWeight: 500 }}>{unit}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}
