"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DATA, AVG_INF, AVG_MAT, MAX_INF, MAX_MAT } from "@/lib/data";

type RankMode = "infant" | "maternal";

function severityColor(val: number, max: number) {
  const t = val / max;
  if (t > 0.75) return { text: "#C0392B", bg: "rgba(192,57,43,0.08)", border: "rgba(192,57,43,0.25)", label: "Critical" };
  if (t > 0.50) return { text: "#E74C3C", bg: "rgba(231,76,60,0.08)", border: "rgba(231,76,60,0.22)", label: "Severe" };
  if (t > 0.30) return { text: "#E67E22", bg: "rgba(230,126,34,0.08)", border: "rgba(230,126,34,0.22)", label: "High" };
  if (t > 0.15) return { text: "#d4a017", bg: "rgba(212,160,23,0.08)", border: "rgba(212,160,23,0.22)", label: "Elevated" };
  return { text: "#27AE60", bg: "rgba(39,174,96,0.08)", border: "rgba(39,174,96,0.22)", label: "Moderate" };
}

function SegmentBar({ pct, color }: { pct: number; color: string }) {
  const filled = Math.round((pct / 100) * 12);
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          width: 5, height: 18, borderRadius: 3,
          background: i < filled ? color : "rgba(0,0,0,0.07)",
          transition: "background 0.4s",
          opacity: i < filled ? (0.55 + (i / 12) * 0.45) : 1,
        }} />
      ))}
    </div>
  );
}

export default function RankingsTable() {
  const [mode, setMode] = useState<RankMode>("infant");

  const sorted = [...DATA].sort((a, b) =>
    mode === "infant" ? b.infant - a.infant : b.maternal - a.maternal
  );
  const maxVal = sorted[0][mode];
  const avg = mode === "infant" ? AVG_INF : AVG_MAT;
  const max = mode === "infant" ? MAX_INF : MAX_MAT;

  const activeCount = sorted.length;
  const unit = mode === "infant" ? "per 1,000 births" : "per 100,000 births";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Card shell ── */}
      <div style={{ background: "#fff", border: "1px solid #D0E8F5", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 32px rgba(28,171,226,0.08)" }}>

        {/* Header bar */}
        <div style={{ background: "linear-gradient(90deg,#002B4D,#003F6B)", padding: "1.1rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Country Rankings</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
              {activeCount} countries · {unit}
            </span>
          </div>
          {/* Mode toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 3, gap: 2 }}>
            {(["infant", "maternal"] as RankMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                background: mode === m ? "#1CABE2" : "transparent",
                border: "none", color: mode === m ? "#fff" : "rgba(255,255,255,0.55)",
                fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600,
                padding: "0.45rem 1.1rem", borderRadius: 6, cursor: "pointer", transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}>
                {m === "infant" ? "👶 Infant" : "🤱 Maternal"}
              </button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "52px 1fr 160px 130px 100px 180px",
          gap: 0, padding: "0.6rem 1.5rem",
          background: "#F5F9FC", borderBottom: "1.5px solid #D0E8F5",
        }}>
          {["#", "Country", "Region", "Rate", "vs Avg", "Severity"].map((h, i) => (
            <div key={h} style={{
              fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#8AAEC4",
              textAlign: i >= 3 ? "right" : "left",
              paddingRight: i >= 3 ? "0.5rem" : 0,
            }}>{h}</div>
          ))}
        </div>

        {/* World avg reference row */}
        <div style={{
          display: "grid", gridTemplateColumns: "52px 1fr 160px 130px 100px 180px",
          gap: 0, padding: "0.65rem 1.5rem",
          background: "#EBF5FB", borderBottom: "1px dashed #B8D8EE",
          alignItems: "center",
        }}>
          <div style={{ fontSize: "0.75rem", color: "#8AAEC4", fontWeight: 700 }}>—</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🌍</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1CABE2" }}>World Average</span>
          </div>
          <div style={{ fontSize: "0.82rem", color: "#8AAEC4", fontStyle: "italic" }}>Global</div>
          <div style={{ textAlign: "right", fontFamily: "'Roboto Mono',monospace", fontSize: "0.95rem", fontWeight: 700, color: "#1CABE2", paddingRight: "0.5rem" }}>
            {mode === "infant" ? AVG_INF : AVG_MAT.toLocaleString()}
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8rem", color: "#8AAEC4", paddingRight: "0.5rem" }}>1.0×</div>
          <div>
            <SegmentBar pct={Math.round(avg / maxVal * 100)} color="#1CABE2" />
          </div>
        </div>

        {/* Animated rows */}
        <motion.div
          style={{ padding: "0.75rem 1rem" }}
          variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
          initial="hidden"
          animate="visible"
        >
          {sorted.map((c, i) => {
            const rank = i + 1;
            const val = c[mode];
            const pct = Math.round((val / maxVal) * 100);
            const mult = (val / avg).toFixed(1);
            const sev = severityColor(val, max);
            const valFmt = mode === "infant" ? val.toFixed(1) : val.toLocaleString();
            const rankColor = rank === 1 ? "#D4A017" : rank === 2 ? "#9CA3AF" : rank === 3 ? "#B07830" : "#C4D8E8";
            const rankNum = rank < 10 ? `0${rank}` : `${rank}`;

            return (
              <motion.div
                key={c.id}
                variants={{
                  hidden: { opacity: 0, x: -20, scale: 0.97, filter: "blur(3px)" },
                  visible: {
                    opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
                    transition: { type: "spring", stiffness: 380, damping: 26, mass: 0.55 },
                  },
                }}
                style={{ marginBottom: 6 }}
              >
                <motion.div
                  whileHover={{ y: -1, boxShadow: `0 4px 20px ${sev.text}18` }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    position: "relative", borderRadius: 10, overflow: "hidden",
                    border: `1px solid ${sev.border}`,
                    background: "#FAFCFE",
                    display: "grid", gridTemplateColumns: "52px 1fr 160px 130px 100px 180px",
                    gap: 0, alignItems: "center", padding: "0.8rem 0.5rem",
                    cursor: "pointer",
                  }}
                >
                  {/* Severity gradient right-side glow */}
                  <div style={{
                    position: "absolute", right: 0, top: 0, bottom: 0, width: "35%",
                    background: `linear-gradient(to left, ${sev.text}0D, transparent)`,
                    pointerEvents: "none",
                  }} />

                  {/* Rank number */}
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.1rem", fontWeight: 800, color: rankColor, letterSpacing: "-0.02em" }}>{rankNum}</span>
                  </div>

                  {/* Country */}
                  <Link href={`/country/${c.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                    <span className="flag-emoji" style={{ fontSize: "1.55rem", flexShrink: 0, lineHeight: 1 }}>{c.flag}</span>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a2e3b", letterSpacing: "-0.01em" }}>{c.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "#1CABE2", fontWeight: 600, marginTop: "0.08rem" }}>View full analysis →</div>
                    </div>
                  </Link>

                  {/* Region */}
                  <div style={{ fontSize: "0.8rem", color: "#6B8FA8", fontWeight: 500 }}>{c.region}</div>

                  {/* Rate */}
                  <div style={{ textAlign: "right", paddingRight: "0.5rem" }}>
                    <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.15rem", fontWeight: 800, color: sev.text }}>{valFmt}</span>
                  </div>

                  {/* vs Avg */}
                  <div style={{ textAlign: "right", paddingRight: "0.5rem" }}>
                    <span style={{
                      display: "inline-block", padding: "0.22rem 0.55rem",
                      borderRadius: 5, fontSize: "0.75rem", fontWeight: 700,
                      background: sev.bg, color: sev.text, border: `1px solid ${sev.border}`,
                      fontFamily: "'Roboto Mono',monospace",
                    }}>{mult}×</span>
                  </div>

                  {/* Severity bar */}
                  <div style={{ paddingLeft: "0.25rem" }}>
                    <SegmentBar pct={pct} color={sev.text} />
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <div style={{ padding: "0.85rem 1.75rem", borderTop: "1px solid #EBF5FB", background: "#FAFCFE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.75rem", color: "#8AAEC4" }}>Source: WHO · UNICEF · UN IGME 2024 · Click any row to view full country analysis</span>
          <span style={{ fontSize: "0.75rem", color: "#8AAEC4" }}>30 highest-mortality countries shown</span>
        </div>
      </div>
    </div>
  );
}
