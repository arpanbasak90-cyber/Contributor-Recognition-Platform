import React from 'react';
import { Wallet, LogOut, RefreshCw, Layers, Sun, Moon, ChevronDown, Globe, Compass } from 'lucide-react';
import { WalletState, NetworkId } from '../services/stellar';

interface HeaderProps {
  walletState: WalletState;
  theme: 'dark' | 'light';
  network: NetworkId;
  onSelectNetwork: (network: NetworkId) => void;
  onToggleTheme: () => void;
  onOpenWalletModal: () => void;
  onDisconnect: () => void;
  onRefreshBalance: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletState,
  theme,
  network,
  onSelectNetwork,
  onToggleTheme,
  onOpenWalletModal,
  onDisconnect,
  onRefreshBalance
}) => {
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 5)}`;
  };

  const getProviderName = (providerId: string | null) => {
    switch (providerId) {
      case 'freighter': return 'Freighter';
      case 'albedo': return 'Albedo';
      case 'xbull': return 'xBull';
      case 'rabet': return 'Rabet';
      default: return 'Stellar Wallet';
    }
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #0284C7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-main)',
            color: '#FFFFFF'
          }}>
            <Compass size={22} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)', lineHeight: '1.2' }}>
              Stellar Recognizer
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Contributor Recognition & Tipping Platform
            </p>
          </div>
        </div>

        {/* Right Header: Network Selector, Theme Toggle & Wallet Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Network Switcher Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.2rem 0.5rem' }}>
            <Globe size={14} color="var(--accent-cyan)" />
            <select
              value={network}
              onChange={(e) => onSelectNetwork(e.target.value as NetworkId)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <option value="testnet" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>🟢 Testnet</option>
              <option value="mainnet" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>🔵 Mainnet</option>
              <option value="localhost" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>🟡 Localhost</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="btn btn-secondary"
            style={{ padding: '0.45rem', borderRadius: '50%', minWidth: '36px', height: '36px' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={17} color="#FDE047" /> : <Moon size={17} color="#475569" />}
          </button>

          {walletState.connected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Balance Badge */}
              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem'
              }}>
                <Layers size={14} color="var(--accent-cyan)" />
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                  {walletState.balance} XLM
                </span>
                <button
                  onClick={onRefreshBalance}
                  title="Refresh Balance"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <RefreshCw size={12} className={walletState.isLoading ? 'spin' : ''} />
                </button>
              </div>

              {/* Connected Address & Provider */}
              <div style={{
                background: 'var(--primary-light)',
                border: '1px solid rgba(124, 58, 237, 0.25)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Wallet size={14} color="var(--primary)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {formatAddress(walletState.publicKey)}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {getProviderName(walletState.provider)}
                  </span>
                </div>
                <button
                  onClick={onDisconnect}
                  className="btn btn-danger"
                  style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', marginLeft: '0.2rem' }}
                  title="Disconnect Wallet"
                >
                  <LogOut size={12} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenWalletModal}
              disabled={walletState.isLoading}
              className="btn btn-primary"
            >
              <Wallet size={16} />
              {walletState.isLoading ? 'Connecting...' : 'Connect Wallet'}
              <ChevronDown size={13} style={{ marginLeft: '1px' }} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
