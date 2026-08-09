import React, { useState } from 'react';
import { Award, GitPullRequest, Gift, ExternalLink, Github, Plus, UserPlus, Trash2 } from 'lucide-react';
import { Contributor } from '../services/stellar';

interface ContributorListProps {
  contributors: Contributor[];
  onAddContributor: (contributor: Contributor) => void;
  onRemoveContributor: (id: string) => void;
  onSelectContributor: (contributor: { name: string; publicKey: string }) => void;
}

export const ContributorList: React.FC<ContributorListProps> = ({
  contributors,
  onAddContributor,
  onRemoveContributor,
  onSelectContributor
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [role, setRole] = useState('Open Source Contributor');

  const handleCreateContributor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !publicKey.trim()) return;

    const newContrib: Contributor = {
      id: 'contrib-' + Date.now(),
      name: name.trim(),
      github: github.trim() || 'stellar-dev',
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`,
      publicKey: publicKey.trim(),
      role: role.trim() || 'Contributor',
      contributions: Math.floor(Math.random() * 15) + 1,
      totalTips: '0 XLM',
      badge: 'Active Contributor'
    };

    onAddContributor(newContrib);
    setName('');
    setGithub('');
    setPublicKey('');
    setShowAddForm(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Award size={22} color="#F59E0B" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Open Source Contributors Leaderboard</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Dynamic directory of registered project contributors ready to receive on-chain Stellar rewards.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
        >
          <UserPlus size={16} /> {showAddForm ? 'Cancel' : 'Add New Contributor'}
        </button>
      </div>

      {/* Dynamic Add Form */}
      {showAddForm && (
        <form onSubmit={handleCreateContributor} className="animate-slide-up" style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#C4B5FD' }}>Register Custom Contributor</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Contributor Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Satoshi Nakamoto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                GitHub Username
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. satoshi"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Stellar Testnet Public Key (G...)
            </label>
            <input
              type="text"
              className="input-field font-mono"
              placeholder="GAAZ..."
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Role / Specialty
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Smart Contract Auditor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-cyan" style={{ alignSelf: 'flex-start', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> Save Contributor
          </button>
        </form>
      )}

      {/* Contributors Grid */}
      {contributors.length === 0 ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-glass)' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>No contributors registered yet.</p>
          <p style={{ fontSize: '0.85rem' }}>Click <strong>"Add New Contributor"</strong> above to add your first project member!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {contributors.map((contributor) => (
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                position: 'relative'
              }}
              className="glass-panel"
            >
              <div>
                {/* Header Avatar & Delete */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--primary)',
                      background: 'rgba(255,255,255,0.05)'
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {contributor.badge}
                    </span>
                    <button
                      onClick={() => onRemoveContributor(contributor.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.2rem' }}
                      title="Remove Contributor"
                    >
                      <Trash2 size={14} color="#EF4444" />
                    </button>
                  </div>
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

                {/* Public Key */}
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
                <Gift size={15} /> Select to Tip {contributor.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
