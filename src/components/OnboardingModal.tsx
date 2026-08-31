import React, { useState } from "react";
import { X, User, Mail, Wallet, Star, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { trackEvent } from "../services/analytics";

const GOOGLE_FORM_URL = "https://forms.gle/StellarMintUserFeedbackForm50";
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0";

interface OnboardingModalProps {
  walletAddress: string;
  onClose: () => void;
}

type Step = "form" | "submitted";

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ walletAddress, onClose }) => {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required";
    if (rating === 0) errs.rating = "Please rate your experience";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const userRecord = {
        name: name.trim(),
        email: email.trim(),
        walletAddress,
        rating,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("stellar_crp_users") || "[]");
      existing.push(userRecord);
      localStorage.setItem("stellar_crp_users", JSON.stringify(existing));
      trackEvent("WALLET_CONNECTED", { provider: "onboarding", name: name.trim() });
    } catch { /* ignore */ }

    await new Promise(r => setTimeout(r, 700));
    setIsSubmitting(false);
    setStep("submitted");
  };

  const starLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  return (
    <div className="modal-overlay" style={{ alignItems: "center", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "480px", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", animation: "modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)", margin: "1rem" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "999px", padding: "0.2rem 0.65rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "0.5rem" }}>
              ✨ User Onboarding
            </div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {step === "submitted" ? "Welcome Aboard! 🎉" : "Join the Platform"}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", opacity: 0.8, marginTop: "0.25rem" }}>
              {step === "submitted" ? "Your details have been recorded" : "Register to get recognized as a contributor"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "var(--bg-inner-box)", border: "1px solid var(--border-color)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={15} color="var(--text-muted)" />
          </button>
        </div>

        {step === "submitted" ? (
          /* Success State */
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(52,211,153,0.2)", border: "2px solid var(--accent-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <CheckCircle2 size={32} color="var(--accent-green)" />
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Welcome, <strong>{name}</strong>! You are now part of our growing community of <strong>50+ Stellar contributors</strong>.
            </p>

            <div style={{ background: "var(--bg-inner-box)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem", textAlign: "left", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div><span style={{ color: "var(--text-muted)", opacity: 0.7 }}>Name:</span> <strong>{name}</strong></div>
                <div><span style={{ color: "var(--text-muted)", opacity: 0.7 }}>Wallet:</span> <span style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{walletAddress.slice(0, 14)}...{walletAddress.slice(-6)}</span></div>
                <div><span style={{ color: "var(--text-muted)", opacity: 0.7 }}>Rating:</span> {"⭐".repeat(rating)}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}>
                <ExternalLink size={14} /> Also Submit to Official Form
              </a>
              <button onClick={onClose} className="btn btn-secondary" style={{ width: "100%" }}>
                Start Exploring <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {/* Name */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                <User size={13} /> Full Name *
              </label>
              <input type="text" className="input-field" placeholder="e.g. Arpan Basa" value={name} onChange={e => setName(e.target.value)} />
              {errors.name && <div style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                <Mail size={13} /> Email Address *
              </label>
              <input type="email" className="input-field" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && <div style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>{errors.email}</div>}
            </div>

            {/* Wallet — pre-filled */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                <Wallet size={13} /> Stellar Wallet Address (auto-filled)
              </label>
              <input type="text" className="input-field font-mono" value={walletAddress} readOnly style={{ opacity: 0.75, fontSize: "0.78rem" }} />
            </div>

            {/* Star Rating */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                <Star size={13} style={{ display: "inline", marginRight: "0.35rem" }} />
                Rate Your Experience (1–5) *
              </label>
              <div className="star-rating" style={{ justifyContent: "flex-start", margin: "0.25rem 0" }}>
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" className={`star-btn ${s <= (hoverRating || rating) ? "active" : ""}`}
                    onClick={() => setRating(s)} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} style={{ fontSize: "1.75rem" }}>
                    {s <= (hoverRating || rating) ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
              {(hoverRating || rating) > 0 && <p style={{ fontSize: "0.78rem", color: "var(--accent-gold)", fontWeight: 700, marginTop: "0.2rem" }}>{starLabels[hoverRating || rating]}</p>}
              {errors.rating && <div style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.2rem" }}>{errors.rating}</div>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: "100%", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.25rem" }}>
              {isSubmitting ? "Registering..." : <><CheckCircle2 size={16} /> Register & Join Platform</>}
            </button>

            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", opacity: 0.7, lineHeight: 1.5 }}>
              Your data is stored locally and used for platform analytics only.{" "}
              <a href={SHEET_URL} target="_blank" rel="noreferrer" style={{ color: "var(--accent-cyan)" }}>View community sheet</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

