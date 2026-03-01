"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { BY_ID, MAX_INF, MAX_MAT, type Country } from "@/lib/data";

type MapMode = "infant" | "maternal";

function countryColor(id: number, mode: MapMode): string {
  const c = BY_ID[id];
  if (!c) return "#C8E6F5";
  const val = mode === "infant" ? c.infant : c.maternal;
  const max = mode === "infant" ? MAX_INF : MAX_MAT;
  const t = Math.min(val / max, 1);
  if (t < 0.25) return d3.interpolateRgb("#BDE3F4", "#1CABE2")(t / 0.25);
  if (t < 0.50) return d3.interpolateRgb("#1CABE2", "#F39C12")((t - 0.25) / 0.25);
  if (t < 0.75) return d3.interpolateRgb("#F39C12", "#E74C3C")((t - 0.50) / 0.25);
  return d3.interpolateRgb("#E74C3C", "#7B241C")((t - 0.75) / 0.25);
}

function sevCls(val: number, max: number): string {
  const t = val / max;
  if (t > 0.75) return "#EF9A9A";
  if (t > 0.50) return "#FFB74D";
  if (t > 0.25) return "#FFF176";
  return "#A5D6A7";
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  country: Country | null;
}

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef   = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const [mode, setMode] = useState<MapMode>("infant");
  const modeRef = useRef<MapMode>("infant");
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, country: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;
    const W = 1300, H = 520;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g");
    gRef.current = g;

    const proj    = d3.geoNaturalEarth1().scale(168).translate([W / 2, H / 2]);
    const pathGen = d3.geoPath().projection(proj);

    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.8, 8])
        .on("zoom", e => g.attr("transform", e.transform))
    );

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then((world: Topology) => {
        const nations = topojson.feature(
          world,
          world.objects.countries as GeometryCollection
        ) as GeoJSON.FeatureCollection;

        g.selectAll<SVGPathElement, GeoJSON.Feature>("path.country")
          .data(nations.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", pathGen as never)
          .attr("fill", d => countryColor(+(d.id ?? 0), modeRef.current))
          .on("mousemove", (event: MouseEvent, d) => {
            const c = BY_ID[+(d.id ?? 0)];
            if (!c) return;
            const vw = window.innerWidth, vh = window.innerHeight;
            let x = event.clientX + 20, y = event.clientY - 10;
            if (x + 320 > vw) x = event.clientX - 330;
            if (y + 260 > vh) y = event.clientY - 280;
            setTooltip({ visible: true, x, y, country: c });
          })
          .on("mouseleave", () => setTooltip(t => ({ ...t, visible: false })));

        g.append("path")
          .datum(topojson.mesh(world, world.objects.countries as GeometryCollection, (a, b) => a !== b))
          .attr("d", pathGen as never)
          .attr("fill", "none")
          .attr("stroke", "rgba(255,255,255,0.6)")
          .attr("stroke-width", 0.5);

        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!gRef.current || !loaded) return;
    modeRef.current = mode;
    gRef.current.selectAll<SVGPathElement, GeoJSON.Feature>("path.country")
      .transition().duration(600)
      .attr("fill", d => countryColor(+(d.id ?? 0), mode));
  }, [mode, loaded]);

  const DATA_SORTED = Object.values(BY_ID);
  const iSort = [...DATA_SORTED].sort((a, b) => b.infant - a.infant);
  const mSort = [...DATA_SORTED].sort((a, b) => b.maternal - a.maternal);

  return (
    <>
      <div className="map-card" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 20px rgba(28,171,226,0.08)" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", background: "#FAFCFF", gap: "1rem" }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)" }}>
            Showing: <strong style={{ color: "var(--unicef-dark)" }}>
              {mode === "infant" ? "Infant Mortality (per 1,000 live births)" : "Maternal Mortality (per 100,000 live births)"}
            </strong>
          </div>
          <div style={{ display: "flex", border: "1.5px solid var(--border2)", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
            {(["infant", "maternal"] as MapMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{ background: mode === m ? "#1CABE2" : "#fff", border: "none", color: mode === m ? "#fff" : "var(--text-muted)", fontFamily: "'Roboto',sans-serif", fontSize: "0.85rem", fontWeight: 500, padding: "0.55rem 1.3rem", cursor: "pointer", transition: "all 0.2s", borderRight: m === "infant" ? "1.5px solid var(--border2)" : "none", letterSpacing: "0.01em" }}>
                {m === "infant" ? "Infant Mortality" : "Maternal Mortality"}
              </button>
            ))}
          </div>
        </div>

        <svg ref={svgRef} id="world-map" style={{ width: "100%", height: 520, display: "block", background: "#E2F2FA" }} />

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.9rem 1.5rem", borderTop: "1px solid var(--border)", background: "#FAFCFF", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Low</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 220, height: 10, borderRadius: 5, background: "linear-gradient(to right,#BDE3F4,#1CABE2,#F39C12,#E74C3C,#7B241C)", flexShrink: 0 }} />
            <div style={{ width: 220, display: "flex", justifyContent: "space-between", marginTop: "0.2rem" }}>
              <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>0</span>
              <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>{mode === "infant" ? "50" : "600"}</span>
              <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>{mode === "infant" ? "100+" : "1,200+"}</span>
            </div>
          </div>
          <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Critical</span>
          <span style={{ marginLeft: "auto", fontSize: "0.73rem", color: "var(--text-dim)", fontStyle: "italic" }}>World avg marked in teal</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.country && (() => {
        const c = tooltip.country;
        const iRank = iSort.findIndex(x => x.id === c.id) + 1;
        const mRank = mSort.findIndex(x => x.id === c.id) + 1;
        return (
          <div style={{ position: "fixed", left: tooltip.x, top: tooltip.y, pointerEvents: "none", zIndex: 999, background: "#003F6B", borderRadius: 10, padding: "1.2rem 1.5rem", minWidth: 250, maxWidth: 310, boxShadow: "0 8px 36px rgba(0,0,0,0.28)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", paddingBottom: "0.9rem", marginBottom: "0.9rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "1.7rem", lineHeight: 1 }}>{c.flag}</span>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{c.name}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.42)", marginTop: "0.1rem" }}>{c.region}</div>
              </div>
            </div>
            {[
              { key: "Infant Mortality", val: c.infant.toFixed(1), sub: "per 1,000 live births", rank: `Ranked #${iRank} of 30 highest`, color: sevCls(c.infant, MAX_INF) },
              { key: "Maternal Mortality", val: c.maternal.toLocaleString(), sub: "per 100,000 live births", rank: `Ranked #${mRank} of 30 highest`, color: sevCls(c.maternal, MAX_MAT) },
            ].map(({ key, val, sub, rank, color }) => (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.38rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.48)" }}>{key}</span>
                  <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.9rem", fontWeight: 600, color }}>{val}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.38rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.48)" }}>{sub}</span>
                  <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{rank}</span>
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </>
  );
}
