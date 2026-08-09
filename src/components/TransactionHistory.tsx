import React from 'react';
import { History, ExternalLink, ArrowUpRight, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { TransactionRecord } from '../services/stellar';

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
  onClearHistory?: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, onClearHistory }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--accent-cyan-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <History size={20} color="var(--accent-cyan)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Stellar Transaction Log</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time feed of confirmed XLM payments, tips, and rewards sent during your session.
            </p>
          </div>
        </div>

        {transactions.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
          >
            <Trash2 size={13} color="#EF4444" /> Clear Log
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div style={{
          padding: '2.5rem 1rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          background: 'var(--bg-inner-box)',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--border-color)'
        }}>
          <Clock size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
          <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No session transactions recorded yet.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Send an XLM tip or invoke a Soroban smart contract reward to record your first on-chain transaction!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                background: 'var(--bg-inner-box)',
                border: '1px solid var(--border-color)',
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
                  background: 'var(--accent-green-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <ArrowUpRight size={20} color="var(--accent-green)" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {tx.isSorobanContract ? 'Soroban Contract Call' : 'Payment Sent'}
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                      <CheckCircle2 size={10} /> Confirmed
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    To: <span className="font-mono">{tx.recipient.substring(0, 6)}...{tx.recipient.substring(tx.recipient.length - 4)}</span> • Memo: "{tx.memo}"
                  </div>
                </div>
              </div>

              {/* Right: Amount & Hash Link */}
              <div style={{ textAlign: 'right' }}>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  -{tx.amount} XLM
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  {tx.timestamp} •{' '}
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}
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
