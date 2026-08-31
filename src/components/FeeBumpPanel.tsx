import React, { useState } from "react";
import { Zap, Shield, CheckCircle2, Info, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { buildFeeBumpTransaction, calculateSponsoredSavings, validateFeeBumpEligibility, SPONSOR_PUBLIC_KEY } from "../services/feeBump";

const HORIZON_TESTNET = "https://horizon-testnet.stellar.org";
const HORIZON_MAINNET = "https://horizon.stellar.org";

export const FeeBumpPanel: React.FC = () => {
  const [innerXdr, setInnerXdr] = useState("");
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [result, setResult] = useState<{ success: boolean; message: string; feeBumpXdr?: string; innerTxHash?: string; sponsoredFee: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showXdr, setShowXdr] = useState(false);
  const [showHow, setShowHow] = useState(false);

  const savings = calculateSponsoredSavings(1);

  const handleBuildFeeBump = async () => {
    if (!innerXdr.trim()) return;
    const validation = validateFeeBumpEligibility(innerXdr.trim(), network);
    if (!validation.eligible) {
      setResult({ success: false, message: validation.reason, sponsoredFee: "0" });
      return;
    }
    setIsLoading(true);
    const res = await buildFeeBumpTransaction(innerXdr.trim(), network);
    setResult(res);
    setIsLoading(false);
  };

  const handleSubmitToHorizon = async () => {
    if (!result?.feeBumpXdr) return;
    const endpoint = network === "mainnet" ? HORIZON_MAINNET : HORIZON_TESTNET;
    try {
      const response = await fetch(`${endpoint}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `tx=${encodeURIComponent(result.feeBumpXdr)}`,
      });
      const data = await response.json();
      if (data.hash) {
        setResult(prev => prev ? { ...prev, message: `✅ Submitted! Tx hash: ${data.hash}` } : prev);
      } else {
        setResult(prev => prev ? { ...prev, message: `Error: ${data.detail || JSON.stringify(data.extras?.result_codes)}` } : prev);
      }
    } catch (e) {
      setResult(prev => prev ? { ...prev, message: `Network error: ${e}` } : prev);
    }
  };

  return (
    <div className="animate-slide-up" style={{ paddingBottom: "2rem" }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, #8B5CF6, #38BDF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={22} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800 }}>Fee Sponsorship — Gasless Transactions</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", opacity: 0.85 }}>Advanced Feature: Stellar Fee Bump Transactions (SEP standard)</p>
          </div>
          <span style={{ marginLeft: "auto", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: "999px", padding: "0.2rem 0.7rem", fontSize: "0.7rem", fontWeight: 700, color: "#8B5CF6" }}>⚡ Fee Sponsorship</span>
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-panel" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
        <button onClick={() => setShowHow(h => !h)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.92rem" }}>
            <Info size={16} color="var(--accent-cyan)" /> How Fee Sponsorship Works
          </div>
          {showHow ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
        </button>

        {showHow && (
          <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { step: "1", icon: "👤", title: "User Signs Tx", desc: "The contributor signs their reward transaction with their own wallet — pays ZERO fees." },
              { step: "2", icon: "🔁", title: "Fee Bump Wraps It", desc: "Our platform wraps the inner tx in a Fee Bump envelope signed by the sponsor account." },
              { step: "3", icon: "💰", title: "Sponsor Pays Fee", desc: `Sponsor (${SPONSOR_PUBLIC_KEY.slice(0, 8)}...) covers the ${savings.totalSaved} transaction fee.` },
              { step: "4", icon: "⛓️", title: "Both Confirmed", desc: "Both the inner tx and fee bump are confirmed on Stellar ledger in one operation." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} style={{ background: "var(--bg-inner-box)", borderRadius: "var(--radius-sm)", padding: "1rem", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 900 }}>{step}</span>
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{title}</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, opacity: 0.85 }}>{desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Base Fee Per Op", value: `${savings.baseFeeStroops} stroops`, color: "var(--accent-cyan)" },
          { label: "Fee in XLM", value: savings.baseFeeXlm, color: "var(--accent-gold)" },
          { label: "User Pays", value: "0 XLM", color: "var(--accent-green)" },
          { label: "Sponsor Account", value: `${SPONSOR_PUBLIC_KEY.slice(0, 10)}...`, color: "var(--primary)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="metric-card" style={{ "--metric-accent": color } as React.CSSProperties}>
            <div className="metric-value" style={{ fontSize: "1.1rem", wordBreak: "break-all" }}>{value}</div>
            <div className="metric-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Fee Bump Builder */}
      <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Shield size={17} color="var(--primary)" /> Build Fee Bump Transaction
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
              Network
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["testnet", "mainnet"] as const).map(n => (
                <button key={n} onClick={() => setNetwork(n)} className={`btn ${network === n ? "btn-primary" : "btn-secondary"}`} style={{ padding: "0.4rem 1rem", fontSize: "0.82rem" }}>
                  {n === "testnet" ? "🧪 Testnet" : "🌐 Mainnet"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
              Inner Transaction XDR (signed)
            </label>
            <textarea
              className="input-field"
              placeholder="Paste your signed inner transaction XDR here (base64 encoded)..."
              value={innerXdr}
              onChange={e => setInnerXdr(e.target.value)}
              rows={4}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", resize: "vertical" }}
            />
          </div>

          <button onClick={handleBuildFeeBump} disabled={!innerXdr.trim() || isLoading} className="btn btn-primary" style={{ width: "100%", padding: "0.75rem" }}>
            {isLoading ? "Building Fee Bump..." : <><Zap size={16} /> Build Fee Bump Envelope</>}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", background: result.success ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${result.success ? "rgba(52,211,153,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "var(--radius-sm)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: result.feeBumpXdr ? "0.75rem" : 0 }}>
              {result.success ? <CheckCircle2 size={16} color="var(--accent-green)" /> : <Info size={16} color="#EF4444" />}
              <span style={{ fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.5 }}>{result.message}</span>
            </div>

            {result.feeBumpXdr && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button onClick={() => setShowXdr(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: "var(--accent-cyan)", fontWeight: 700, textAlign: "left", padding: 0 }}>
                  {showXdr ? "▲ Hide" : "▼ Show"} Fee Bump XDR
                </button>
                {showXdr && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", wordBreak: "break-all", background: "var(--bg-inner-box)", padding: "0.75rem", borderRadius: "var(--radius-sm)", maxHeight: "120px", overflowY: "auto", opacity: 0.85 }}>
                    {result.feeBumpXdr}
                  </div>
                )}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={handleSubmitToHorizon} className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "0.45rem 0.9rem" }}>
                    Submit to Horizon
                  </button>
                  <a href={`https://stellar.expert/explorer/${network}/tx/${result.innerTxHash}`} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: "0.8rem", padding: "0.45rem 0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <ExternalLink size={13} /> Explorer
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reference */}
      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center", opacity: 0.7 }}>
        Built using <a href="https://developers.stellar.org/docs/learn/encyclopedia/transactions-specialized/fee-bump-transactions" target="_blank" rel="noreferrer" style={{ color: "var(--accent-cyan)" }}>Stellar Fee Bump Transaction spec</a>
        {" · "}<a href="https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md" target="_blank" rel="noreferrer" style={{ color: "var(--accent-cyan)" }}>CAP-0015</a>
      </div>
    </div>
  );
};

