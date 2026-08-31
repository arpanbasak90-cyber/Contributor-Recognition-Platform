import React, { useState } from 'react';
import { Wallet, ShieldCheck, Sparkles, ArrowRight, Compass, Layers, CheckCircle2, Users, ExternalLink, Zap } from 'lucide-react';

interface WalletGateProps {
  onOpenWalletModal: () => void;
  onDemoConnect: () => void;
}

const STEPS = [
  { label: 'Welcome' },
  { label: 'Connect' },
  { label: 'Explore' },
];

const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSexample/viewform';

export const WalletGate: React.FC<WalletGateProps> = ({ onOpenWalletModal, onDemoConnect }) => {
  const [step, setStep] = useState(0); // 0 = Welcome, 1 = Connect

  return (
    <div style={{
      maxWidth: '700px',
      margin: '3rem auto 2rem auto',
      padding: '0 1rem'
    }} className="animate-slide-up">

      {/* Onboarding Stepper */}
      <div className="onboard-stepper" style={{ gap: 0 }}>
        {STEPS.map((s, i) => (
          <div key={s.label} className="step-item">
            <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${i < step ? 'done' : ''}`} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
        {STEPS.map((s, i) => (
          <span key={s.label} style={{ opacity: i === step ? 1 : 0.5 }}>{s.label}</span>
        ))}
      </div>

      {/* Main Card */}
      <div className="glass-panel" style={{ padding: '2.5rem 2rem', border: '1px solid var(--border-hover)' }}>

        {step === 0 ? (
          /* Step 0: Welcome */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '76px', height: '76px', borderRadius: '22px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #0284C7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.75rem auto',
              boxShadow: '0 8px 24px rgba(124,58,237,0.4)'
            }}>
              <Compass size={40} color="#FFFFFF" />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '0.25rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '1rem' }}>
              🟢 Level 4 Production MVP • Stellar Testnet
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.85rem', letterSpacing: '-0.03em' }}>
              Stellar Contributor Recognition Platform
            </h1>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65', maxWidth: '520px', margin: '0 auto 1.75rem auto', opacity: 0.9 }}>
              Reward open-source contributors with instant XLM micro-transactions powered by <strong>Soroban smart contracts</strong> on the Stellar blockchain.
            </p>

            {/* Social proof */}
            <div style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.1), rgba(56,189,248,0.08))', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex' }}>
                {['AS', 'RK', 'MP', 'JL', 'TB'].map((init, i) => (
                  <div key={i} className="user-avatar-bubble">{init}</div>
                ))}
                <div className="user-avatar-bubble" style={{ background: 'rgba(52,211,153,0.35)', color: 'var(--accent-green)' }}>+15</div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-green)' }}>
                  <Users size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
                  20+ users already onboarded
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                  Verified wallet interactions on Stellar Mainnet
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', fontSize: '0.82rem' }}>
              {[
                { icon: <ShieldCheck size={13} color="var(--accent-green)" />, text: 'Multi-Wallet Kit' },
                { icon: <Layers size={13} color="var(--accent-cyan)" />, text: 'Live Balance Fetching' },
                { icon: <Sparkles size={13} color="var(--accent-gold)" />, text: 'Soroban Contracts' },
                { icon: <Zap size={13} color="var(--primary)" />, text: 'Real-time Analytics' },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  {icon} {text}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="btn btn-primary"
              id="onboard-next-btn"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', width: '100%', maxWidth: '380px' }}
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>

        ) : (
          /* Step 1: Connect */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px',
              background: 'var(--primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid rgba(139,92,246,0.3)'
            }}>
              <Wallet size={30} color="var(--primary)" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Connect Your Stellar Wallet
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 2rem auto', opacity: 0.9 }}>
              Connect with Freighter, Albedo, xBull, or Rabet to unlock the full contributor dashboard, leaderboard, and Soroban smart contract reward suite.
            </p>

            {/* Wallet options visual */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', maxWidth: '380px', margin: '0 auto 1.75rem auto' }}>
              {[
                { icon: '🚀', name: 'Freighter', desc: 'Official SDF Wallet' },
                { icon: '🌌', name: 'Albedo', desc: 'Web-based Signer' },
                { icon: '🐂', name: 'xBull', desc: 'Soroban-Ready' },
                { icon: '🐇', name: 'Rabet', desc: 'Browser Extension' },
              ].map(w => (
                <div key={w.name} style={{ background: 'var(--bg-inner-box)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{w.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{w.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', opacity: 0.75 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '380px', margin: '0 auto' }}>
              <button onClick={onOpenWalletModal} className="btn btn-primary" style={{ padding: '0.85rem', fontSize: '1rem', width: '100%' }} id="connect-wallet-main-btn">
                <Wallet size={20} /> Connect Wallet <ArrowRight size={16} />
              </button>
              <button onClick={onDemoConnect} className="btn btn-secondary" style={{ padding: '0.65rem', fontSize: '0.85rem', width: '100%' }} id="demo-connect-btn">
                Launch Instant Demo Session
              </button>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                ← Back
              </button>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={13} /> Share Feedback <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

