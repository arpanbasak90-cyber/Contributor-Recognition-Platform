import React from 'react';
import { Wallet, ShieldCheck, Sparkles, ArrowRight, Lock, Layers } from 'lucide-react';

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
      <div className="glass-panel" style={{ padding: '3rem 2rem', border: '1px solid var(--border-hover)' }}>
        {/* Icon Header */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: '1px solid rgba(124, 58, 237, 0.3)'
        }}>
          <Lock size={32} color="var(--primary)" />
        </div>

        {/* Title & Tagline */}
        <div className="badge badge-purple" style={{ marginBottom: '1rem', fontSize: '0.78rem' }}>
          <Sparkles size={13} /> Level 1 & Level 2 Verified dApp
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.85rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          Connect Wallet to Access Platform
        </h1>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          Please connect your Stellar Testnet wallet (Freighter, Albedo, xBull, or Rabet) to unlock the contributor leaderboard, balance manager, and Soroban smart contract tipping suite.
        </p>

        {/* Features preview pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <ShieldCheck size={14} color="var(--accent-green)" /> Multi-Wallet Kit
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Layers size={14} color="var(--accent-cyan)" /> Live Horizon Balance
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
            <Wallet size={20} /> Connect Wallet (Multi-Wallet) <ArrowRight size={16} />
          </button>

          <button
            onClick={onDemoConnect}
            className="btn btn-secondary"
            style={{ padding: '0.65rem', fontSize: '0.85rem', width: '100%' }}
          >
            Launch Instant Testnet Demo Session
          </button>
        </div>
      </div>
    </div>
  );
};
