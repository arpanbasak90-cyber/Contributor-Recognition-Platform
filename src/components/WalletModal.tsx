import React, { useState, useEffect } from 'react';
import { X, Shield, ArrowRight, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import {
  WalletProviderInfo,
  WalletProviderId,
  getAvailableWalletProviders,
  connectWallet,
  fetchXlmBalance,
  WalletState
} from '../services/stellar';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected: (state: WalletState) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onWalletConnected
}) => {
  const [providers, setProviders] = useState<WalletProviderInfo[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<WalletProviderId | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    async function loadProviders() {
      const list = await getAvailableWalletProviders();
      setProviders(list);
    }
    if (isOpen) {
      loadProviders();
      setErrorInfo(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectProvider = async (providerId: WalletProviderId) => {
    setSelectedProvider(providerId);
    setLoading(true);
    setErrorInfo(null);

    try {
      const { publicKey } = await connectWallet(providerId);
      const balance = await fetchXlmBalance(publicKey);

      onWalletConnected({
        connected: true,
        publicKey,
        network: 'Stellar Testnet',
        balance,
        provider: providerId,
        isLoading: false,
        error: null
      });
      onClose();
    } catch (err: any) {
      console.warn('Wallet connect error:', err);
      const errorType = err.type || 'WALLET_NOT_FOUND';
      setErrorInfo({
        type: errorType,
        message: err.message || 'Failed to connect selected wallet.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel animate-slide-up" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '1.75rem',
        border: '1px solid var(--border-glow)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shield size={22} color="#8B5CF6" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Select Stellar Wallet</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Choose your preferred Stellar Testnet wallet provider to interact with Soroban Smart Contracts.
        </p>

        {/* Error Banner inside Modal */}
        {errorInfo && (
          <div className="alert-box alert-error" style={{ marginBottom: '1rem' }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem' }}>
                [{errorInfo.type}] Connection Error
              </strong>
              <span style={{ fontSize: '0.8rem' }}>{errorInfo.message}</span>
            </div>
          </div>
        )}

        {/* Provider List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSelectProvider(provider.id)}
              disabled={loading}
              style={{
                background: selectedProvider === provider.id ? 'var(--primary-light)' : 'rgba(10, 14, 23, 0.7)',
                border: selectedProvider === provider.id ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{provider.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {provider.name}
                    </span>
                    {provider.installed ? (
                      <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                        <CheckCircle2 size={10} /> Ready
                      </span>
                    ) : (
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                        Web / Extension
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    {provider.description}
                  </div>
                </div>
              </div>

              <ArrowRight size={18} color={selectedProvider === provider.id ? '#C4B5FD' : 'var(--text-dim)'} />
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          Don't have a wallet?{' '}
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#06B6D4', textDecoration: 'none' }}
          >
            Get Freighter Extension <ExternalLink size={11} style={{ display: 'inline' }} />
          </a>
        </div>
      </div>
    </div>
  );
};
