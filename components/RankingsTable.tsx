"use client";
import { useState } from "react";
import Link from "next/link";
import { DATA, AVG_INF, AVG_MAT, MAX_INF, MAX_MAT } from "@/lib/data";

type RankMode = "infant" | "maternal";

function rateClass(val: number, max: number): string {
  const t = val / max;
  if (t > 0.75) return "#C0392B";
  if (t > 0.50) return "#E74C3C";
  if (t > 0.30) return "#E67E22";
  if (t > 0.15) return "#d4a017";
  return "#27AE60";
}

function barColor(val: number, max: number): string {
  const t = val / max;
  if (t > 0.75) return "#C0392B";
  if (t > 0.50) return "#E74C3C";
  if (t > 0.30) return "#E67E22";
  if (t > 0.15) return "#d4a017";
  return "#27AE60";
}

export default function RankingsTable() {
  const [mode, setMode] = useState<RankMode>("infant");

  const sorted = [...DATA].sort((a, b) =>
    mode === "infant" ? b.infant - a.infant : b.maternal - a.maternal
  );
  const maxVal = sorted[0][mode];
  const avg    = mode === "infant" ? AVG_INF : AVG_MAT;
  const max    = mode === "infant" ? MAX_INF : MAX_MAT;

  const scrollToMap = () => {
    document.querySelector(".map-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
          Ranked from highest to lowest · Click a row to view full country analysis · World average shown for reference
        </p>
        <div style={{ display: "flex", border: "1.5px solid var(--border2)", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
          {(["infant", "maternal"] as RankMode[]).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ background: mode === m ? "#1CABE2" : "#fff", border: "none", color: mode === m ? "#fff" : "var(--text-muted)", fontFamily: "'Roboto',sans-serif", fontSize: "0.85rem", fontWeight: 500, padding: "0.55rem 1.3rem", cursor: "pointer", transition: "all 0.2s", borderRight: m === "infant" ? "1.5px solid var(--border2)" : "none" }}>
              {m === "infant" ? "Infant Mortality" : "Maternal Mortality"}
            </button>
          ))}
        </div>
      </div>

      <div className="rank-table-wrap table-card" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 20px rgba(28,171,226,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["#", "Country", "Region", mode === "infant" ? "Rate (per 1,000)" : "Rate (per 100,000)", "vs World Avg", "Severity"].map((h, i) => (
                <th key={h} style={{ background: "#003F6B", color: "rgba(255,255,255,0.72)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", padding: "1.1rem 1.25rem", textAlign: i === 0 ? "center" : i >= 3 ? "right" : "left", whiteSpace: "nowrap", width: i === 0 ? 64 : i === 5 ? 150 : undefined }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* World average row */}
            <tr style={{ borderTop: "2px dashed var(--border2)", borderBottom: "1px solid var(--border)" }}>
              <td colSpan={2} style={{ padding: "0.65rem 1.25rem", background: "#EBF5FB", fontStyle: "normal", fontWeight: 600, color: "#1CABE2", fontSize: "0.88rem" }}>🌍 World Average</td>
              <td style={{ padding: "0.65rem 1.25rem", background: "#EBF5FB", fontSize: "0.88rem", color: "var(--text-muted)", fontStyle: "italic" }}>Global</td>
              <td style={{ padding: "0.65rem 1.25rem", background: "#EBF5FB", textAlign: "right", color: "#1CABE2", fontSize: "1rem", fontFamily: "'Roboto Mono',monospace", fontWeight: 700 }}>
                {mode === "infant" ? AVG_INF : AVG_MAT.toLocaleString()}
              </td>
              <td style={{ padding: "0.65rem 1.25rem", background: "#EBF5FB", textAlign: "right", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>1.0× avg</td>
              <td className="td-bar-cell" style={{ padding: "0.65rem 1.25rem", background: "#EBF5FB", width: 140 }}>
                <div style={{ height: 7, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, background: "#1CABE2", width: `${(avg / maxVal * 100).toFixed(1)}%`, transition: "width 0.6s ease-out" }} />
                </div>
              </td>
            </tr>

            {sorted.map((c, i) => {
              const rank = i + 1;
              const val  = c[mode];
              const pct  = (val / maxVal * 100).toFixed(1);
              const mult = (val / avg).toFixed(1);
              const rc   = rateClass(val, max);
              const bc   = barColor(val, max);
              const rankColor = rank === 1 ? "#D4A017" : rank === 2 ? "#8A9BB0" : rank === 3 ? "#B07830" : "var(--text-dim)";
              const valFmt = mode === "infant" ? val.toFixed(1) : val.toLocaleString();

              return (
                <tr key={c.id}
                  style={{ borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseOver={e => (e.currentTarget as HTMLTableRowElement).style.background = "var(--surface)"}
                  onMouseOut={e => (e.currentTarget as HTMLTableRowElement).style.background = ""}
                >
                  <td style={{ padding: "1rem 1.25rem", textAlign: "center", fontFamily: "'Roboto Mono',monospace", fontSize: "1rem", fontWeight: 700, color: rankColor }}>{rank}</td>
                  <td style={{ padding: "1rem 1.25rem", verticalAlign: "middle" }}>
                    <Link href={`/country/${c.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.9rem", textDecoration: "none" }}>
                      <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{c.flag}</span>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)" }}>{c.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "#1CABE2", marginTop: "0.1rem", fontWeight: 500 }}>View analysis →</div>
                      </div>
                    </Link>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", fontSize: "0.85rem", color: "var(--text-muted)", verticalAlign: "middle" }}>{c.region}</td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right", fontFamily: "'Roboto Mono',monospace", fontSize: "1.1rem", fontWeight: 700, color: rc, verticalAlign: "middle" }}>{valFmt}</td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right", fontSize: "0.85rem", color: "var(--text-muted)", verticalAlign: "middle" }}>{mult}× avg</td>
                  <td className="td-bar-cell" style={{ padding: "1rem 1.25rem", width: 140, verticalAlign: "middle" }}>
                    <div style={{ height: 7, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: bc, width: `${pct}%`, transition: "width 0.6s ease-out" }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
