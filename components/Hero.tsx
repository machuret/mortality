"use client";

const COLLAGE_SEEDS = [
  { seed: "pregn1",   w: 600, h: 500, span: "span-r2" },
  { seed: "africa2",  w: 400, h: 250, span: "" },
  { seed: "hosp3",    w: 450, h: 250, span: "" },
  { seed: "child4",   w: 400, h: 500, span: "span-r2" },
  { seed: "rural5",   w: 400, h: 250, span: "" },
  { seed: "mother6",  w: 450, h: 250, span: "" },
  { seed: "village7", w: 800, h: 220, span: "span-c2" },
  { seed: "clinic8",  w: 400, h: 220, span: "" },
  { seed: "baby9",    w: 400, h: 220, span: "" },
];

const GRADIENTS = [
  "linear-gradient(145deg,#3a1c1c 0%,#7a3d2a 100%)",
  "linear-gradient(145deg,#1a3a2a 0%,#2d6b4a 100%)",
  "linear-gradient(145deg,#1a2840 0%,#2c4a70 100%)",
  "linear-gradient(145deg,#3d2a1a 0%,#7a5230 100%)",
  "linear-gradient(145deg,#2a1a3a 0%,#5a3070 100%)",
  "linear-gradient(145deg,#1a3040 0%,#285060 100%)",
  "linear-gradient(145deg,#3a2a1a 0%,#6a4a28 100%)",
  "linear-gradient(145deg,#1a2a3a 0%,#234060 100%)",
  "linear-gradient(145deg,#2a1a2a 0%,#503050 100%)",
];

export default function Hero() {
  const scrollTo = (sel: string) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 620, display: "flex", alignItems: "stretch" }}>

      {/* Photo collage grid background */}
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1.2fr 0.9fr 1.1fr 0.85fr", gridTemplateRows: "repeat(3,1fr)", gap: 3, background: "#001828", zIndex: 0 }}>
        {COLLAGE_SEEDS.map((c, i) => (
          <div
            key={c.seed}
            className="hc"
            style={{
              backgroundImage: `url('https://picsum.photos/seed/${c.seed}/${c.w}/${c.h}')`,
              gridRow:   c.span === "span-r2" ? "span 2" : undefined,
              gridColumn: c.span === "span-c2" ? "span 2" : undefined,
              background: GRADIENTS[i],
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(105deg, rgba(0,18,38,0.93) 0%, rgba(0,25,50,0.85) 35%, rgba(0,22,45,0.6) 60%, rgba(0,15,35,0.72) 100%), linear-gradient(180deg, rgba(0,15,35,0.45) 0%, transparent 25%, transparent 75%, rgba(0,10,28,0.6) 100%)" }} />
      {/* Scanline texture */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "5.5rem 2rem 6rem", display: "flex", alignItems: "center" }}>
        <div className="hero-inner" style={{ maxWidth: 1340, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "5rem", alignItems: "center", width: "100%" }}>

          {/* Left copy */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.22em", color: "#1CABE2", marginBottom: "1.3rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <span style={{ width: 28, height: 2, background: "#1CABE2", display: "inline-block", flexShrink: 0 }} />
              Global Mortality Crisis 2026
            </div>

            <h1 style={{ fontSize: "clamp(2.5rem,4.5vw,4.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.07, marginBottom: "1.6rem", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
              A child dies<br />every{" "}
              <em style={{ fontStyle: "normal", color: "#5DCCF5" }}>6 seconds.</em>
              <br />A mother every 2 min.
            </h1>

            <p style={{ fontSize: "1.08rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, fontWeight: 300, maxWidth: 560, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
              In 2023, an estimated <strong style={{ color: "#fff", fontWeight: 600 }}>4.8 million children</strong> died before their fifth birthday, and{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>260,000 mothers</strong> died from pregnancy-related causes. Over{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>92%</strong> of these deaths occurred in low- and lower-middle-income countries — and nearly all were preventable.
            </p>

            <div className="hero-cta-row" style={{ display: "flex", gap: "1rem", marginTop: "2.2rem", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => scrollTo(".table-card")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", background: "#E8480E", color: "#fff", fontFamily: "'Roboto',sans-serif", fontSize: "1rem", fontWeight: 700, padding: "1rem 2rem", borderRadius: 6, textDecoration: "none", border: "none", cursor: "pointer", letterSpacing: "0.03em", animation: "cta-pulse-ring 2.5s ease-out infinite", transition: "all 0.22s ease" }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FF5520"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = "#E8480E"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                Take Action
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button
                onClick={() => scrollTo(".map-card")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", fontFamily: "'Roboto',sans-serif", fontSize: "0.9rem", fontWeight: 500, padding: "1rem 1.6rem", borderRadius: 6, border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", letterSpacing: "0.02em", backdropFilter: "blur(8px)", transition: "all 0.22s ease" }}
                onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.55)"; b.style.color = "#fff"; b.style.background = "rgba(255,255,255,0.14)"; }}
                onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.25)"; b.style.color = "rgba(255,255,255,0.85)"; b.style.background = "rgba(255,255,255,0.08)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                Explore the Data
              </button>
            </div>
          </div>

          {/* Right — professional data panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

            {/* Panel 1 — Child Deaths */}
            <div style={{ background: "rgba(0,15,35,0.7)", border: "1px solid rgba(28,171,226,0.2)", borderRadius: 8, overflow: "hidden", backdropFilter: "blur(16px)", transition: "border-color 0.2s" }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(28,171,226,0.45)"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(28,171,226,0.2)"}
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: 4, background: "#1CABE2", flexShrink: 0 }} />
                <div style={{ padding: "1.3rem 1.5rem", flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#5DCCF5", marginBottom: "0.6rem" }}>Child Mortality · Under 5</div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.85rem", marginBottom: "0.9rem" }}>
                    <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>4.8M</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>deaths in 2023</span>
                  </div>
                  <div style={{ display: "flex", gap: "0" }}>
                    <div style={{ flex: 1, textAlign: "center", padding: "0.6rem 0.5rem", background: "rgba(93,204,245,0.07)", borderRadius: "6px 0 0 6px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.4rem", fontWeight: 800, color: "#5DCCF5", lineHeight: 1 }}>2.3M</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", marginTop: "0.3rem", fontWeight: 500 }}>Newborns (first 28 days)</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", padding: "0.6rem 0.5rem", background: "rgba(93,204,245,0.07)", borderRadius: "0 6px 6px 0" }}>
                      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.4rem", fontWeight: 800, color: "#5DCCF5", lineHeight: 1 }}>92%</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", marginTop: "0.3rem", fontWeight: 500 }}>In low-income countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2 — Maternal Deaths */}
            <div style={{ background: "rgba(0,15,35,0.7)", border: "1px solid rgba(255,183,77,0.2)", borderRadius: 8, overflow: "hidden", backdropFilter: "blur(16px)", transition: "border-color 0.2s" }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,183,77,0.45)"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,183,77,0.2)"}
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: 4, background: "#FFB74D", flexShrink: 0 }} />
                <div style={{ padding: "1.3rem 1.5rem", flex: 1 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#FFB74D", marginBottom: "0.6rem" }}>Maternal Mortality · Pregnancy-Related</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.85rem", marginBottom: "0.9rem" }}>
                    <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>260K</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>deaths in 2023</span>
                  </div>
                  <div style={{ display: "flex", gap: "0" }}>
                    <div style={{ flex: 1, textAlign: "center", padding: "0.6rem 0.5rem", background: "rgba(255,183,77,0.07)", borderRadius: "6px 0 0 6px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.4rem", fontWeight: 800, color: "#FFB74D", lineHeight: 1 }}>70%</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", marginTop: "0.3rem", fontWeight: 500 }}>Sub-Saharan Africa</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", padding: "0.6rem 0.5rem", background: "rgba(255,183,77,0.07)", borderRadius: "0 6px 6px 0" }}>
                      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "1.4rem", fontWeight: 800, color: "#FFB74D", lineHeight: 1 }}>~2min</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", marginTop: "0.3rem", fontWeight: 500 }}>One death every 2 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3 — Progress */}
            <div style={{ background: "rgba(0,15,35,0.7)", border: "1px solid rgba(239,154,154,0.2)", borderRadius: 8, overflow: "hidden", backdropFilter: "blur(16px)", transition: "border-color 0.2s" }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,154,154,0.45)"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,154,154,0.2)"}
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: 4, background: "#EF9A9A", flexShrink: 0 }} />
                <div style={{ padding: "1.3rem 1.5rem", flex: 1 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#EF9A9A", marginBottom: "0.6rem" }}>Progress Since 2000 · Decelerating</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.85rem", marginBottom: "0.9rem" }}>
                    <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>–52%</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>under-5 mortality reduction</span>
                  </div>
                  {/* Progress bar */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>2000 baseline</span>
                      <span style={{ fontSize: "0.72rem", color: "#EF9A9A", fontWeight: 600 }}>Target: –67% by 2030 (SDG)</span>
                    </div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                      <div style={{ height: "100%", width: "52%", background: "linear-gradient(90deg,#EF9A9A,#C0392B)", borderRadius: 4 }} />
                      <div style={{ position: "absolute", top: 0, bottom: 0, left: "77.6%", width: 2, background: "rgba(255,255,255,0.5)" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>52% achieved</span>
                      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>15% remaining to SDG goal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Source strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.2rem" }}>
              <div style={{ width: 16, height: 1, background: "rgba(255,255,255,0.15)" }} />
              <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Sources: WHO · UNICEF · UN IGME 2024 · World Bank</span>
            </div>

          </div>

        </div>
      </div>

      <div style={{ position: "absolute", bottom: "0.6rem", right: "1rem", fontSize: "0.55rem", color: "rgba(255,255,255,0.18)", zIndex: 3, letterSpacing: "0.05em" }}>
        Imagery: Picsum · WHO · UNICEF
      </div>
    </section>
  );
}
