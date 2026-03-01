export default function Footer() {
  return (
    <footer style={{ background: "#001828", borderTop: "2px solid rgba(28,171,226,0.3)", marginTop: "1rem" }}>

      {/* Main footer body */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "3.5rem 2rem 2.5rem" }}>
        <div className="footer-inner" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "start" }}>

          {/* Left — brand + description */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1CABE2" }} />
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", fontFamily: "'Montserrat',sans-serif" }}>Stop Maternal Mortality</span>
            </div>
            <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, fontWeight: 400, maxWidth: 480 }}>
              This tracker uses real-time estimates based on annual UN data to visualise the scale of preventable child and maternal deaths worldwide. The main counter starts from January 1, 2026 at midnight and adds one child death every 6 seconds — the statistical reality. Visit us at{" "}
              <a href="https://stopmaternalmortality.com" style={{ color: "#1CABE2", textDecoration: "none", fontWeight: 600 }}>stopmaternalmortality.com</a>
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", fontStyle: "italic" }}>
              Data is for educational and advocacy purposes only.
            </p>
          </div>

          {/* Right — sources + methodology */}
          <div>
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1CABE2", marginBottom: "1rem", fontWeight: 700 }}>Data Sources</h4>
            <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
              {["WHO", "UNICEF", "UN IGME 2024", "CIA World Factbook 2024", "World Bank", "UNFPA"].map(s => (
                <li key={s} style={{ fontSize: "0.8rem", background: "rgba(28,171,226,0.12)", color: "#ffffff", padding: "0.3rem 0.85rem", borderRadius: 4, border: "1px solid rgba(28,171,226,0.35)", fontWeight: 500 }}>{s}</li>
              ))}
            </ul>

            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1CABE2", marginBottom: "0.75rem", fontWeight: 700 }}>Methodology</h4>
            <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              <p>Infant mortality: deaths under 1 year per 1,000 live births.</p>
              <p>Maternal mortality: deaths per 100,000 live births within 42 days.</p>
              <p>Child counter: 4.8M ÷ 365.25 days ÷ 86,400 sec = ~1 death per 6 seconds.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
            © 2026 <a href="https://stopmaternalmortality.com" style={{ color: "#1CABE2", textDecoration: "none" }}>stopmaternalmortality.com</a> — Educational use only
          </span>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
            Built with WHO · UNICEF · UN IGME 2024 data
          </span>
        </div>
      </div>

    </footer>
  );
}
