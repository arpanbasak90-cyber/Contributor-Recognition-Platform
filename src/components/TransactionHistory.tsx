import React from 'react';
import { History, ExternalLink, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { TransactionRecord } from '../services/stellar';

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--accent-cyan-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <History size={20} color="#06B6D4" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Stellar Testnet Transaction Log</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time feed of confirmed XLM payments, tips, and rewards.
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-dim)', background: 'rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-glass)' }}>
          <Clock size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
          <p style={{ fontSize: '0.9rem' }}>No transactions recorded yet in this session.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Send an XLM tip to a contributor above to create your first on-chain testnet record!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                background: 'rgba(10, 14, 23, 0.7)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              {/* Left: Icon & Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <ArrowUpRight size={20} color="#10B981" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Payment Sent</span>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                      <CheckCircle2 size={10} /> Confirmed
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    To: <span className="font-mono">{tx.recipient.substring(0, 6)}...{tx.recipient.substring(tx.recipient.length - 4)}</span> • Memo: "{tx.memo}"
                  </div>
                </div>
              </div>

              {/* Right: Amount & Hash Link */}
              <div style={{ textAlign: 'right' }}>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FDE047' }}>
                  -{tx.amount} XLM
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  {tx.timestamp} •{' '}
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#06B6D4', textDecoration: 'none' }}
                  >
                    View Tx <ExternalLink size={10} style={{ display: 'inline' }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
