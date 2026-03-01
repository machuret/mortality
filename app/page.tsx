import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorldMap from "@/components/WorldMap";
import RankingsTable from "@/components/RankingsTable";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      {/* Map section */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--unicef-dark)", whiteSpace: "nowrap" }}>Interactive World Map</h2>
          <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "-1.4rem", marginBottom: "1.6rem" }}>
          Hover any country to see its mortality data · Darker = higher mortality · Scroll to zoom · Drag to pan
        </p>
        <WorldMap />
      </div>

      {/* Rankings section */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 2rem 3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--unicef-dark)", whiteSpace: "nowrap" }}>Country Rankings — Top 30</h2>
          <div style={{ flex: 1, height: 2, background: "var(--border)" }} />
        </div>
        <RankingsTable />
      </div>

      <Footer />
    </>
  );
}
