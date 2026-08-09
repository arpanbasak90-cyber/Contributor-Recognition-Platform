import React from 'react';
import { Wallet, LogOut, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { WalletState } from '../services/stellar';

interface HeaderProps {
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefreshBalance: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletState,
  onConnect,
  onDisconnect,
  onRefreshBalance
}) => {
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 5)}`;
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--border-glass)',
      background: 'rgba(11, 14, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={22} color="#FFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #FFF, #C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Stellar Recognizer
              </h1>
              <span className="badge badge-purple">Level 1</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Contributor Recognition & Tipping Platform
            </p>
          </div>
        </div>

        {/* Right Header: Network status & Wallet button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Testnet Badge */}
          <div className="badge badge-cyan">
            <span className="pulse-dot"></span>
            Stellar Testnet
          </div>

          {walletState.connected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Balance Badge */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-glass)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem'
              }}>
                <Layers size={15} color="#06B6D4" />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Balance:</span>
                <span className="font-mono" style={{ fontWeight: 700, color: '#FDE047' }}>
                  {walletState.balance} XLM
                </span>
                <button
                  onClick={onRefreshBalance}
                  title="Refresh Balance"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <RefreshCw size={13} className={walletState.isLoading ? 'spin' : ''} />
                </button>
              </div>

              {/* Connected Address & Disconnect */}
              <div style={{
                background: 'var(--primary-light)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <Wallet size={15} color="#C4B5FD" />
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
                  {formatAddress(walletState.publicKey)}
                </span>
                <button
                  onClick={onDisconnect}
                  className="btn btn-danger"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  title="Disconnect Freighter Wallet"
                >
                  <LogOut size={13} />
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={walletState.isLoading}
              className="btn btn-primary"
            >
              <Wallet size={18} />
              {walletState.isLoading ? 'Connecting...' : 'Connect Freighter Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
