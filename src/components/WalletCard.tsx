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
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', margin: '1.5rem 0' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <Wallet size={28} color="#C4B5FD" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Connect Freighter Wallet to Continue
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Link your Stellar Testnet wallet to view your balance, tip platform contributors, and submit verified on-chain transactions.
        </p>
        <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <ExternalLink size={16} /> Get Freighter Extension
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '1.75rem', margin: '1.5rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        {/* Account Summary Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>CONNECTED STELLAR ACCOUNT</span>
            <span className="badge badge-green">Active</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.95rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', wordBreak: 'break-all' }}>
              {walletState.publicKey}
            </span>
            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{ padding: '0.45rem', minWidth: '36px' }}
              title="Copy Address"
            >
              {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Explorer Link:{' '}
            <a
              href={`https://stellar.expert/explorer/testnet/account/${walletState.publicKey}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#06B6D4', textDecoration: 'none' }}
            >
              View on Stellar Expert Explorer <ExternalLink size={12} style={{ display: 'inline' }} />
            </a>
          </div>
        </div>

        {/* Balance & Faucet Column */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE BALANCE</span>
            <span style={{ fontSize: '0.75rem', color: '#06B6D4' }}>Stellar Horizon Testnet</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#FDE047' }}>
              {walletState.balance}
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>XLM</span>
          </div>

          {/* Friendbot Quick Faucet */}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Need Testnet Funds?</span>
            <button
              onClick={handleRequestFaucet}
              disabled={faucetLoading}
              className="btn btn-cyan"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Droplets size={14} />
              {faucetLoading ? 'Funding...' : 'Get 10,000 Testnet XLM'}
            </button>
          </div>

          {faucetMessage && (
            <div className="alert-box alert-success" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', margin: 0 }}>
              <AlertCircle size={14} />
              {faucetMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
