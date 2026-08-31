import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Target, Lightbulb, TrendingUp, Cpu, Rocket, Map, Users, ExternalLink } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  content: React.ReactNode;
}

const CONTRACT_ID = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";
const DEMO_URL = "https://contributor-recognition-platform.vercel.app";
const GITHUB_URL = "https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform";

export const PitchDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrent(c => Math.min(c + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setCurrent(c => Math.max(c - 1, 0));
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const slides: Slide[] = [
    {
      id: 0,
      title: "Stellar Contributor Recognition Platform",
      subtitle: "Rewarding Open-Source Contributors On-Chain",
      icon: <Rocket size={48} color="#FFFFFF" />,
      accentColor: "#8B5CF6",
      content: (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {[["🟢", "Soroban MVP"], ["⭐", "Soroban dApp"], ["👥", "50+ Users"], ["🔗", "Stellar Testnet"]].map(([icon, label]) => (
              <div key={label} style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: "12px", padding: "1rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{icon}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.25rem", background: "#8B5CF6", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem" }}>
              <ExternalLink size={14} /> Live Demo
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.25rem", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", border: "1px solid rgba(255,255,255,0.2)" }}>
              GitHub Repo
            </a>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "The Problem",
      subtitle: "Open-source contributors are invisible and unrewarded",
      icon: <Target size={48} color="#FFFFFF" />,
      accentColor: "#EF4444",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {[
            { emoji: "😔", title: "No Recognition", desc: "Thousands of developers contribute daily to open-source projects with zero financial recognition." },
            { emoji: "💸", title: "Slow Payments", desc: "Traditional payment rails are slow, expensive, and exclude global contributors from getting paid." },
            { emoji: "🔒", title: "No Transparency", desc: "Tip and reward systems are opaque, centralized, and prone to manipulation or withholding." },
            { emoji: "🌍", title: "Global Exclusion", desc: "Bank accounts, PayPal, and Stripe exclude millions of contributors in underbanked regions." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "12px", padding: "1.25rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{emoji}</div>
              <div style={{ fontWeight: 800, marginBottom: "0.5rem", fontSize: "0.95rem" }}>{title}</div>
              <div style={{ fontSize: "0.82rem", opacity: 0.85, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 2,
      title: "Our Solution",
      subtitle: "Instant, transparent, borderless contributor rewards on Stellar",
      icon: <Lightbulb size={48} color="#FFFFFF" />,
      accentColor: "#34D399",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { emoji: "⚡", title: "Instant XLM Rewards", desc: "Send XLM tips to any contributor in seconds — no bank, no border, no middleman." },
              { emoji: "🔗", title: "Soroban Smart Contracts", desc: "Rewards are executed on-chain via Soroban contracts — transparent, auditable, immutable." },
              { emoji: "🌐", title: "Multi-Wallet Support", desc: "Connect with Freighter, Albedo, xBull, or Rabet. Any Stellar wallet works instantly." },
              { emoji: "📊", title: "Live Analytics", desc: "Full analytics dashboard — track tips sent, users onboarded, and platform activity in real time." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{emoji}</div>
                <div style={{ fontWeight: 800, marginBottom: "0.4rem", fontSize: "0.9rem" }}>{title}</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.85, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "10px", padding: "1rem 1.5rem", fontSize: "0.88rem", fontWeight: 700, textAlign: "center" }}>
            🎯 Contract: <span style={{ fontFamily: "monospace", color: "#34D399" }}>{CONTRACT_ID.slice(0,20)}...</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Market Opportunity",
      subtitle: "A multi-billion dollar open-source economy waiting for blockchain",
      icon: <TrendingUp size={48} color="#FFFFFF" />,
      accentColor: "#FBBF24",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { value: "$8.8B", label: "Global OSS Economy (2024)", color: "#FBBF24" },
              { value: "100M+", label: "GitHub Developers Worldwide", color: "#38BDF8" },
              { value: "$500M+", label: "Blockchain Dev Tool Market", color: "#34D399" },
              { value: "4.2B", label: "Unbanked Adults Globally", color: "#EF4444" },
              { value: "5sec", label: "Stellar Transaction Speed", color: "#8B5CF6" },
              { value: "$0.001", label: "Avg Stellar Transaction Fee", color: "#FBBF24" },
            ].map(({ value, label, color }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${color}40`, borderRadius: "12px", padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color, fontFamily: "monospace", marginBottom: "0.4rem" }}>{value}</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.8, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "10px", padding: "1rem 1.5rem", fontSize: "0.85rem", textAlign: "center", fontWeight: 600 }}>
            💡 Stellar''s speed + near-zero fees make it the perfect infrastructure for micro-payment rewards at global scale.
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Technical Architecture",
      subtitle: "Full-stack production dApp on Stellar Testnet",
      icon: <Cpu size={48} color="#FFFFFF" />,
      accentColor: "#38BDF8",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { layer: "Frontend", tech: "React 18 + TypeScript + Vite", color: "#38BDF8" },
              { layer: "Smart Contract", tech: "Soroban (Rust) on Stellar Testnet", color: "#8B5CF6" },
              { layer: "Wallet Layer", tech: "Freighter + Albedo + xBull + Rabet", color: "#34D399" },
              { layer: "Blockchain SDK", tech: "@stellar/stellar-sdk v16", color: "#FBBF24" },
              { layer: "Analytics", tech: "Custom localStorage event engine", color: "#EF4444" },
              { layer: "CI/CD", tech: "GitHub Actions + Vercel", color: "#38BDF8" },
            ].map(({ layer, tech, color }) => (
              <div key={layer} style={{ background: "rgba(255,255,255,0.05)", borderLeft: `3px solid ${color}`, padding: "0.85rem 1rem", borderRadius: "0 8px 8px 0" }}>
                <div style={{ fontSize: "0.72rem", color, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{layer}</div>
                <div style={{ fontSize: "0.83rem", fontWeight: 600 }}>{tech}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["React", "TypeScript", "Soroban", "Stellar SDK", "Vite", "Vitest", "GitHub Actions", "Vercel"].map(tag => (
              <span key={tag} style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "999px", padding: "0.2rem 0.65rem", fontSize: "0.75rem", fontWeight: 700 }}>{tag}</span>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Growth Strategy",
      subtitle: "50+ users onboarded — scaling to 500+ in Phase 2",
      icon: <Users size={48} color="#FFFFFF" />,
      accentColor: "#8B5CF6",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { phase: "Phase 1 ✅", label: "0–50 Users", strategy: "Direct outreach in Stellar Discord, GitHub communities, and Rise In builder network. Google Form + onboarding modal.", color: "#34D399" },
              { phase: "Phase 2 🔄", label: "50–500 Users", strategy: "Twitter/X campaign targeting OSS contributors. Integration with GitHub Actions to auto-reward PR merges.", color: "#38BDF8" },
              { phase: "Phase 3 🚀", label: "500–5K Users", strategy: "Partnerships with open-source foundations. Launch on Product Hunt. Integrate with GitHub API for auto-contributor discovery.", color: "#8B5CF6" },
            ].map(({ phase, label, strategy, color }) => (
              <div key={phase} style={{ background: `${color}15`, border: `1px solid ${color}40`, borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>{phase}</div>
                <div style={{ fontWeight: 800, marginBottom: "0.5rem" }}>{label}</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.85, lineHeight: 1.5 }}>{strategy}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
            {[["50+", "Current Users", "#34D399"], ["29", "Git Commits", "#38BDF8"], ["9/9", "Tests Passing", "#8B5CF6"]].map(([val, label, color]) => (
              <div key={label} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "0.75rem" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color, fontFamily: "monospace" }}>{val}</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.75 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Future Roadmap",
      subtitle: "From MVP to full open-source reward ecosystem",
      icon: <Map size={48} color="#FFFFFF" />,
      accentColor: "#34D399",
      content: (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
            {[
              { quarter: "Q3 2026 ✅", items: ["Soroban smart contract deployed", "Multi-wallet support (4 wallets)", "50+ user onboarding", "Analytics dashboard", "CI/CD pipeline"], color: "#34D399" },
              { quarter: "Q4 2026 🔜", items: ["GitHub API integration — auto-detect contributors", "PR-merge triggered auto-rewards", "NFT badge system for top contributors", "DAO governance for reward pools"], color: "#38BDF8" },
              { quarter: "Q1 2027 🔮", items: ["Mainnet deployment", "Organization accounts & team tipping", "Reputation scoring algorithm", "Cross-chain bridge (Stellar ↔ Ethereum)"], color: "#8B5CF6" },
            ].map(({ quarter, items, color }) => (
              <div key={quarter} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ background: `${color}20`, border: `1px solid ${color}40`, borderRadius: "8px", padding: "0.35rem 0.75rem", fontSize: "0.75rem", fontWeight: 800, color, whiteSpace: "nowrap", flexShrink: 0 }}>{quarter}</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {items.map(item => (
                    <span key={item} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px", padding: "0.2rem 0.65rem", fontSize: "0.75rem", fontWeight: 600 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "10px", padding: "1rem 1.5rem", textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}>
            🌟 Vision: Become the standard reward layer for all open-source contributions on Stellar
          </div>
        </div>
      )
    },
  ];

  const slide = slides[current];
  const wrapStyle: React.CSSProperties = fullscreen
    ? { position: "fixed", inset: 0, zIndex: 9000, borderRadius: 0 }
    : { borderRadius: "16px", position: "relative" };

  return (
    <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: "1.25rem 1.5rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Rocket size={20} color="var(--primary)" />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Pitch Deck</h2>
          <span style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "999px", padding: "0.15rem 0.6rem", fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-cyan)" }}>🚀 Pitch Deck</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Slide {current + 1} / {slides.length}</span>
          <button onClick={() => setFullscreen(f => !f)} className="btn btn-secondary" style={{ padding: "0.4rem 0.7rem", fontSize: "0.78rem" }}>
            <Maximize2 size={14} /> {fullscreen ? "Exit" : "Fullscreen"}
          </button>
        </div>
      </div>

      {/* Slide */}
      <div style={{ ...wrapStyle, background: `linear-gradient(135deg, #0B0F19 0%, ${slide.accentColor}18 100%)`, border: `1px solid ${slide.accentColor}30`, overflow: "hidden" }}>
        {fullscreen && (
          <button onClick={() => setFullscreen(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <X size={18} color="#fff" />
          </button>
        )}

        <div style={{ padding: fullscreen ? "4rem" : "2.5rem 2rem", minHeight: fullscreen ? "100vh" : "520px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Slide Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}80)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 8px 24px ${slide.accentColor}40` }}>
                {slide.icon}
              </div>
              <div>
                <h2 style={{ fontSize: fullscreen ? "2.2rem" : "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.35rem" }}>{slide.title}</h2>
                <p style={{ fontSize: fullscreen ? "1rem" : "0.88rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{slide.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Slide Body */}
          <div style={{ flex: 1, color: "#FFFFFF" }}>{slide.content}</div>
        </div>

        {/* Navigation */}
        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button onClick={() => setCurrent(c => Math.max(c - 1, 0))} disabled={current === 0} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "40px", height: "40px", cursor: current === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: current === 0 ? 0.4 : 1, transition: "all 0.2s" }}>
            <ChevronLeft size={20} color="#fff" />
          </button>

          <div style={{ display: "flex", gap: "0.4rem" }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? slide.accentColor : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>

          <button onClick={() => setCurrent(c => Math.min(c + 1, slides.length - 1))} disabled={current === slides.length - 1} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "40px", height: "40px", cursor: current === slides.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: current === slides.length - 1 ? 0.4 : 1, transition: "all 0.2s" }}>
            <ChevronRight size={20} color="#fff" />
          </button>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.75rem", opacity: 0.7 }}>
        Use ← → arrow keys to navigate • Click dots to jump • Fullscreen for presentation mode
      </p>
    </div>
  );
};

