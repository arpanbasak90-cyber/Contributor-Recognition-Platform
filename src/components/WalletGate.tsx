import React from 'react';
import { Wallet, ShieldCheck, Sparkles, ArrowRight, Compass, Layers } from 'lucide-react';

interface WalletGateProps {
  onOpenWalletModal: () => void;
  onDemoConnect: () => void;
}

export const WalletGate: React.FC<WalletGateProps> = ({ onOpenWalletModal, onDemoConnect }) => {
  return (
    <div style={{
      maxWidth: '680px',
      margin: '4rem auto 2rem auto',
      textAlign: 'center',
      padding: '0 1rem'
    }} className="animate-slide-up">
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', border: '1px solid var(--border-hover)' }}>
        {/* Brand Compass Logo Header */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #0284C7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.75rem auto',
          boxShadow: 'var(--shadow-main)'
        }}>
          <Compass size={38} color="#FFFFFF" />
        </div>

        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, marginBottom: '0.85rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          Connect Wallet to Access Platform
        </h1>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          Please connect your Stellar wallet (Freighter, Albedo, xBull, or Rabet) to unlock the contributor leaderboard, balance manager, and Soroban smart contract tipping suite.
        </p>

        {/* Features preview pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.25rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <ShieldCheck size={14} color="var(--accent-green)" /> Multi-Wallet Kit
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Layers size={14} color="var(--accent-cyan)" /> Live Balance Fetching
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Sparkles size={14} color="var(--accent-gold)" /> Soroban Smart Contracts
          </span>
        </div>

        {/* Primary CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '380px', margin: '0 auto' }}>
          <button
            onClick={onOpenWalletModal}
            className="btn btn-primary"
            style={{ padding: '0.85rem', fontSize: '1rem', width: '100%' }}
          >
            <Wallet size={20} /> Connect Wallet <ArrowRight size={16} />
          </button>

          <button
            onClick={onDemoConnect}
            className="btn btn-secondary"
            style={{ padding: '0.65rem', fontSize: '0.85rem', width: '100%' }}
          >
            Launch Instant Demo Session
          </button>
        </div>
      </div>
    </div>
  );
};
