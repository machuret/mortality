export default function Footer() {
  return (
    <footer style={{ background: "#003F6B", padding: "3rem 2rem", marginTop: "1rem" }}>
      <div className="footer-inner" style={{ maxWidth: 1340, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        <div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.6rem" }}>Every Life Counts</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>
            This tracker uses real-time estimates based on annual UN data to visualise the scale of preventable child and maternal deaths worldwide. The main counter starts from January 1, 2026 at midnight and adds one child death every 6 seconds — the statistical reality. Data is for educational and advocacy purposes.
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.38)", marginBottom: "0.75rem", fontWeight: 600 }}>Data Sources</h4>
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {["WHO", "UNICEF", "UN IGME 2024", "CIA World Factbook 2024", "World Bank", "UNFPA"].map(s => (
              <li key={s} style={{ fontSize: "0.77rem", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", padding: "0.25rem 0.75rem", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)" }}>{s}</li>
            ))}
          </ul>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", marginTop: "1.2rem", lineHeight: 1.7 }}>
            Infant mortality: deaths under 1 year per 1,000 live births.<br />
            Maternal mortality: deaths per 100,000 live births within 42 days of pregnancy termination.<br />
            Child counter: 4.8M deaths ÷ year ÷ 86,400 sec/day = ~1 death per 6 seconds.
          </div>
        </div>
      </div>
    </footer>
  );
}
