import React, { useState } from 'react';
import { Wallet, Copy, Check, Droplets, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { WalletState, requestTestnetFaucet } from '../services/stellar';

interface WalletCardProps {
  walletState: WalletState;
  onRefreshBalance: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ walletState, onRefreshBalance }) => {
  const [copied, setCopied] = useState(false);
  const [faucetLoading, setFaucetLoading] = useState(false);
  const [faucetMessage, setFaucetMessage] = useState<string | null>(null);

  const handleCopy = () => {
    if (walletState.publicKey) {
      navigator.clipboard.writeText(walletState.publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRequestFaucet = async () => {
    if (!walletState.publicKey) return;
    setFaucetLoading(true);
    setFaucetMessage(null);
    try {
      await requestTestnetFaucet(walletState.publicKey);
      setFaucetMessage('Successfully requested 10,000 testnet XLM from Friendbot!');
      setTimeout(() => {
        onRefreshBalance();
      }, 1500);
    } catch (err: any) {
      setFaucetMessage(`Faucet request: ${err.message || 'Complete!'}`);
      onRefreshBalance();
    } finally {
      setFaucetLoading(false);
    }
  };

  if (!walletState.connected) {
    return null;
  }

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', margin: '1.5rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        {/* Account Summary Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--text-main)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.04em' }}>
              CONNECTED STELLAR ACCOUNT
            </span>
            <span className="badge badge-green">Active</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="font-mono" style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              background: 'var(--bg-inner-box)',
              color: 'var(--text-main)',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              wordBreak: 'break-all'
            }}>
              {walletState.publicKey}
            </span>
            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{ padding: '0.55rem', minWidth: '38px' }}
              title="Copy Address"
            >
              {copied ? <Check size={16} color="var(--text-main)" /> : <Copy size={16} />}
            </button>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
            Explorer Link:{' '}
            <a
              href={`https://stellar.expert/explorer/testnet/account/${walletState.publicKey}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-main)', textDecoration: 'underline', fontWeight: 700 }}
            >
              View on Stellar Expert Explorer <ExternalLink size={12} style={{ display: 'inline' }} />
            </a>
          </div>
        </div>

        {/* Balance & Faucet Column */}
        <div style={{
          background: 'var(--bg-inner-box)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 800 }}>AVAILABLE BALANCE</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 700 }}>Stellar Horizon</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {walletState.balance}
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>XLM</span>
          </div>

          {/* Friendbot Quick Faucet */}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>Need Testnet Funds?</span>
            <button
              onClick={handleRequestFaucet}
              disabled={faucetLoading}
              className="btn btn-cyan"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
            >
              <Droplets size={14} />
              {faucetLoading ? 'Funding...' : 'Get 10,000 Testnet XLM'}
            </button>
          </div>

          {faucetMessage && (
            <div className="alert-box alert-success" style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', margin: 0 }}>
              <AlertCircle size={14} />
              {faucetMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
