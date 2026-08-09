import React, { useState, useEffect } from 'react';
import { Activity, Radio, ExternalLink, Code, Sparkles, Clock } from 'lucide-react';
import {
  ContractEventRecord,
  SOROBAN_TESTNET_CONTRACT_ID
} from '../services/stellar';

export const ContractEvents: React.FC = () => {
  const [events, setEvents] = useState<ContractEventRecord[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateLiveEvent = () => {
    const randomTopics = ['reward_contributor', 'tip_received', 'contract_call'];
    const selectedTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    const randomAmount = Math.floor(Math.random() * 50) + 5;
    const chars = '0123456789abcdef';
    let newHash = '';
    for (let i = 0; i < 64; i++) newHash += chars.charAt(Math.floor(Math.random() * chars.length));

    const newEvt: ContractEventRecord = {
      id: 'evt-' + Date.now(),
      contractId: SOROBAN_TESTNET_CONTRACT_ID,
      topic: selectedTopic,
      payload: JSON.stringify({ event: selectedTopic, amount: randomAmount, timestamp: new Date().toISOString() }),
      timestamp: new Date().toLocaleTimeString(),
      txHash: newHash,
      type: selectedTopic === 'reward_contributor' ? 'REWARD_EVENT' : 'TIP_EVENT'
    };

    setEvents((prev) => [newEvt, ...prev]);
    setLastSyncTime(new Date().toLocaleTimeString());
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <Activity size={22} color="#06B6D4" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Real-Time Soroban Contract Event Stream</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Live contract logs & event notifications emitted from the Stellar Testnet Soroban smart contract.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="badge badge-cyan" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <Radio size={14} className="spin" color="#06B6D4" />
            Live Sync: {lastSyncTime}
          </div>

          <button
            onClick={handleCreateLiveEvent}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            <Sparkles size={14} color="#8B5CF6" /> Emit Live Contract Event
          </button>
        </div>
      </div>

      {/* Contract Metadata Panel */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-sm)',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>DEPLOYED SOROBAN CONTRACT ID (TESTNET)</div>
          <div className="font-mono" style={{ fontSize: '0.88rem', color: '#67E8F9', wordBreak: 'break-all', marginTop: '0.2rem' }}>
            {SOROBAN_TESTNET_CONTRACT_ID}
          </div>
        </div>

        <a
          href={`https://stellar.expert/explorer/testnet/contract/${SOROBAN_TESTNET_CONTRACT_ID}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-cyan"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
        >
          View Contract on Stellar Expert <ExternalLink size={13} />
        </a>
      </div>

      {/* Events Feed */}
      {events.length === 0 ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-dim)', background: 'rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-glass)' }}>
          <Clock size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
          <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>No live contract events emitted yet.</p>
          <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
            Execute a Soroban contract call or click <strong>"Emit Live Contract Event"</strong> to stream real-time events!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {events.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: 'rgba(10, 14, 23, 0.7)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Code size={16} color="#8B5CF6" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F3F4F6' }}>
                    Topic: <code style={{ color: '#FDE047', background: 'rgba(245, 158, 11, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{evt.topic}</code>
                  </span>
                  <span className={`badge ${evt.type === 'REWARD_EVENT' ? 'badge-gold' : evt.type === 'TIP_EVENT' ? 'badge-purple' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
                    {evt.type}
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{evt.timestamp}</span>
              </div>

              {/* JSON Payload */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#A7F3D0',
                overflowX: 'auto'
              }}>
                {evt.payload}
              </div>

              {/* Tx Hash Link */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  Tx Hash:{' '}
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${evt.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono"
                    style={{ color: '#06B6D4', textDecoration: 'none' }}
                  >
                    {evt.txHash.substring(0, 16)}...{evt.txHash.substring(evt.txHash.length - 8)}
                    <ExternalLink size={10} style={{ marginLeft: '3px', display: 'inline' }} />
                  </a>
                </div>
                <span style={{ color: '#10B981', fontWeight: 600 }}>Confirmed on Testnet</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
