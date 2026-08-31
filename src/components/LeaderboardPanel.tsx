import React, { useState } from "react";
import { Trophy, Zap, TrendingUp, ExternalLink, Crown, Medal, Award } from "lucide-react";

const EXPLORER_BASE = "https://stellar.expert/explorer/testnet/account/";

interface LeaderEntry {
  rank: number;
  name: string;
  wallet: string;
  totalReceived: string;
  tipsReceived: number;
  badge: string;
  badgeColor: string;
}

const SAMPLE_LEADERS: LeaderEntry[] = [
  { rank: 1, name: "Alex S.", wallet: "GABC...XYZ1", totalReceived: "1,250 XLM", tipsReceived: 47, badge: "🏆 Top Contributor", badgeColor: "#FBBF24" },
  { rank: 2, name: "Riya K.", wallet: "GDEF...XYZ2", totalReceived: "890 XLM", tipsReceived: 33, badge: "🥈 Core Builder", badgeColor: "#94A3B8" },
  { rank: 3, name: "Miku P.", wallet: "GHIJ...XYZ3", totalReceived: "740 XLM", tipsReceived: 28, badge: "🥉 Active Dev", badgeColor: "#CD7C3C" },
  { rank: 4, name: "Jae L.", wallet: "GKLM...XYZ4", totalReceived: "620 XLM", tipsReceived: 22, badge: "⭐ Star Coder", badgeColor: "#8B5CF6" },
  { rank: 5, name: "Tao B.", wallet: "GNOP...XYZ5", totalReceived: "490 XLM", tipsReceived: 18, badge: "🔥 Rising Star", badgeColor: "#EF4444" },
  { rank: 6, name: "Vera N.", wallet: "GQRS...XYZ6", totalReceived: "380 XLM", tipsReceived: 14, badge: "✨ Contributor", badgeColor: "#38BDF8" },
  { rank: 7, name: "Omar J.", wallet: "GTUV...XYZ7", totalReceived: "290 XLM", tipsReceived: 11, badge: "✨ Contributor", badgeColor: "#38BDF8" },
];

const PLATFORM_STATS = [
  { label: "Total XLM Rewarded", value: "5,660 XLM", icon: "💸", color: "#FBBF24" },
  { label: "Active Contributors", value: "50+", icon: "👥", color: "#34D399" },
  { label: "Total Tip Events", value: "173+", icon: "⚡", color: "#8B5CF6" },
  { label: "Avg Tip Size", value: "32.7 XLM", icon: "📊", color: "#38BDF8" },
];

const RECENT_ACTIVITY = [
  { from: "GABC...1234", to: "GDEF...5678", amount: "50 XLM", memo: "Great PR review!", time: "2 min ago" },
  { from: "GHIJ...9012", to: "GKLM...3456", amount: "25 XLM", memo: "Bug fix legend", time: "8 min ago" },
  { from: "GNOP...7890", to: "GQRS...1234", amount: "100 XLM", memo: "Feature launch", time: "15 min ago" },
  { from: "GTUV...5678", to: "GABC...9012", amount: "10 XLM", memo: "Docs improvement", time: "31 min ago" },
  { from: "GWXY...3456", to: "GHIJ...7890", amount: "75 XLM", memo: "Security audit", time: "1 hr ago" },
];

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) return <Crown size={18} color="#FBBF24" />;
  if (rank === 2) return <Medal size={18} color="#94A3B8" />;
  if (rank === 3) return <Award size={18} color="#CD7C3C" />;
  return <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.9rem", color: "var(--text-muted)" }}>#{rank}</span>;
};

export const LeaderboardPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"leaders" | "activity">("leaders");

  return (
    <div className="animate-slide-up" style={{ paddingBottom: "2rem" }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Trophy size={22} color="#FBBF24" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Global Contributor Leaderboard</h2>
            <span style={{ background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.4)", borderRadius: "999px", padding: "0.15rem 0.6rem", fontSize: "0.7rem", fontWeight: 700, color: "#FBBF24" }}>🏆 Leaderboard</span>
          </div>
          <div style={{ display: "flex", background: "var(--bg-input)", borderRadius: "var(--radius-sm)", padding: "0.25rem", gap: "0.25rem" }}>
            {(["leaders", "activity"] as const).map(s => (
              <button key={s} onClick={() => setActiveSection(s)} className={`btn ${activeSection === s ? "btn-primary" : "btn-secondary"}`} style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem", border: "none" }}>
                {s === "leaders" ? <><Trophy size={13} /> Leaderboard</> : <><Zap size={13} /> Live Activity</>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="analytics-grid" style={{ marginBottom: "1.5rem" }}>
        {PLATFORM_STATS.map(({ label, value, icon, color }) => (
          <div key={label} className="metric-card" style={{ "--metric-accent": color } as React.CSSProperties}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{icon}</div>
            <div className="metric-value" style={{ fontSize: "1.5rem" }}>{value}</div>
            <div className="metric-label">{label}</div>
          </div>
        ))}
      </div>

      {activeSection === "leaders" ? (
        /* Leaderboard Table */
        <div className="activity-feed">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-color)", display: "grid", gridTemplateColumns: "48px 1fr 120px 80px", gap: "1rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7 }}>
            <span>Rank</span>
            <span>Contributor</span>
            <span>Total Earned</span>
            <span>Tips</span>
          </div>
          {SAMPLE_LEADERS.map((entry) => (
            <div key={entry.rank} className="activity-item" style={{ display: "grid", gridTemplateColumns: "48px 1fr 120px 80px", gap: "1rem", alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RankIcon rank={entry.rank} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", marginBottom: "0.15rem" }}>{entry.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "var(--text-muted)", opacity: 0.75 }}>{entry.wallet}</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: entry.badgeColor }}>{entry.badge}</span>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#FBBF24", fontSize: "0.9rem", fontFamily: "monospace" }}>{entry.totalReceived}</div>
                <div className="progress-bar-outer" style={{ marginTop: "0.35rem", width: "90px" }}>
                  <div className="progress-bar-inner" style={{ width: `${Math.round((entry.tipsReceived / 47) * 100)}%`, background: `linear-gradient(90deg, ${entry.badgeColor}, #38BDF8)` }} />
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Zap size={13} color="#8B5CF6" />
                {entry.tipsReceived}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Live Activity Feed */
        <div className="activity-feed">
          <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", fontWeight: 700 }}>
            <TrendingUp size={15} color="var(--accent-green)" />
            Live Tip Activity — Stellar Testnet
            <div className="pulse-dot" style={{ marginLeft: "0.25rem" }} />
          </div>
          {RECENT_ACTIVITY.map((tx, i) => (
            <div key={i} className="activity-item">
              <div style={{ fontSize: "1.3rem", flexShrink: 0 }}>💸</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.15rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{tx.from}</span>
                  <span style={{ margin: "0 0.4rem", color: "var(--text-muted)", opacity: 0.6 }}>→</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{tx.to}</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", opacity: 0.75 }}>"{tx.memo}"</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, color: "#FBBF24", fontSize: "0.88rem", fontFamily: "monospace" }}>{tx.amount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", opacity: 0.65 }}>{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stellar Explorer Link */}
      <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
        <a href={`${EXPLORER_BASE}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--accent-cyan)", textDecoration: "none", fontWeight: 700 }}>
          <ExternalLink size={13} /> Verify all transactions on Stellar Expert Explorer
        </a>
      </div>
    </div>
  );
};

