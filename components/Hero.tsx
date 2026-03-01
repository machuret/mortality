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
                ❤ Help Prevent This <span style={{ fontSize: "1.15rem", fontWeight: 900 }}>→</span>
              </button>
              <button
                onClick={() => scrollTo(".map-card")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", fontFamily: "'Roboto',sans-serif", fontSize: "0.9rem", fontWeight: 500, padding: "1rem 1.6rem", borderRadius: 6, border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", letterSpacing: "0.02em", backdropFilter: "blur(8px)", transition: "all 0.22s ease" }}
                onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.55)"; b.style.color = "#fff"; b.style.background = "rgba(255,255,255,0.14)"; }}
                onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.25)"; b.style.color = "rgba(255,255,255,0.85)"; b.style.background = "rgba(255,255,255,0.08)"; }}
              >
                📊 Explore the Data
              </button>
            </div>
          </div>

          {/* Right stat cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "👶", num: "4.8M", cls: "blue",   desc: <>Children under 5 died in 2023<br /><strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>2.3M were newborns in their first 28 days</strong></> },
              { icon: "🤱", num: "260K", cls: "orange", desc: <>Mothers died during pregnancy or childbirth<br /><strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>70% in Sub-Saharan Africa</strong></> },
              { icon: "📉", num: "–52%", cls: "red",    desc: <>Reduction in under-5 mortality since 2000<br /><strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>But progress is now slowing</strong></> },
            ].map(({ icon, num, cls, desc }) => (
              <div key={num} style={{ background: "rgba(0,20,45,0.55)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "1.4rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem", backdropFilter: "blur(12px)", transition: "background 0.2s" }}
                onMouseOver={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(0,30,60,0.7)"}
                onMouseOut={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(0,20,45,0.55)"}
              >
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>{icon}</div>
                <div>
                  <span style={{ fontSize: "2.3rem", fontWeight: 900, lineHeight: 1, display: "block", color: cls === "blue" ? "#5DCCF5" : cls === "orange" ? "#FFB74D" : "#EF9A9A" }}>{num}</span>
                  <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.52)", marginTop: "0.3rem", lineHeight: 1.45 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div style={{ position: "absolute", bottom: "0.6rem", right: "1rem", fontSize: "0.55rem", color: "rgba(255,255,255,0.18)", zIndex: 3, letterSpacing: "0.05em" }}>
        Imagery: Picsum · WHO · UNICEF
      </div>
    </section>
  );
}
