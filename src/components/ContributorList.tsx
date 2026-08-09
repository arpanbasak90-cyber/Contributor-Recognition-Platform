import React from 'react';
import { Award, GitPullRequest, Gift, ExternalLink, Github } from 'lucide-react';
import { DEFAULT_CONTRIBUTORS } from '../services/stellar';

interface ContributorListProps {
  onSelectContributor: (contributor: { name: string; publicKey: string }) => void;
}

export const ContributorList: React.FC<ContributorListProps> = ({ onSelectContributor }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Award size={22} color="#F59E0B" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Featured Open Source Contributors</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Select a contributor to send an instant XLM tip or reward directly to their Stellar account.
          </p>
        </div>
        <span className="badge badge-gold">Leaderboard</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {DEFAULT_CONTRIBUTORS.map((contributor) => (
          <div
            key={contributor.id}
            style={{
              background: 'rgba(10, 14, 23, 0.7)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            className="glass-panel"
          >
            <div>
              {/* Header Avatar & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--primary)'
                  }}
                />
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  {contributor.badge}
                </span>
              </div>

              {/* Contributor Meta */}
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                {contributor.name}
              </h3>
              <a
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}
              >
                <Github size={13} /> @{contributor.github}
              </a>

              <p style={{ fontSize: '0.8rem', color: '#06B6D4', fontWeight: 600, marginBottom: '1rem' }}>
                {contributor.role}
              </p>

              {/* Stats */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.7rem' }}>PRs Merged</span>
                  <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <GitPullRequest size={13} color="#8B5CF6" /> {contributor.contributions}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.7rem' }}>Tips Earned</span>
                  <span style={{ fontWeight: 700, color: '#FDE047' }}>{contributor.totalTips}</span>
                </div>
              </div>

              {/* Public key preview */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                Stellar Key:{' '}
                <a
                  href={`https://stellar.expert/explorer/testnet/account/${contributor.publicKey}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  {contributor.publicKey.substring(0, 6)}...{contributor.publicKey.substring(contributor.publicKey.length - 4)}
                  <ExternalLink size={10} style={{ marginLeft: '2px', display: 'inline' }} />
                </a>
              </div>
            </div>

            {/* Quick Reward Action */}
            <button
              onClick={() => onSelectContributor({ name: contributor.name, publicKey: contributor.publicKey })}
              className="btn btn-cyan"
              style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
            >
              <Gift size={15} /> Tip {contributor.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
