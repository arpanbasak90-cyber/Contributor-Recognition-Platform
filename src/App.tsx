import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WalletGate } from './components/WalletGate';
import { WalletCard } from './components/WalletCard';
import { WalletModal } from './components/WalletModal';
import { ContributorList } from './components/ContributorList';
import { TippingForm } from './components/TippingForm';
import { TransactionHistory } from './components/TransactionHistory';
import { ContractEvents } from './components/ContractEvents';
import {
  WalletState,
  TransactionRecord,
  Contributor,
  fetchXlmBalance,
  fetchLiveAccountTransactions
} from './services/stellar';
import { Award, Send, History, Sparkles, Info, Activity } from 'lucide-react';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    network: 'Stellar Testnet',
    balance: '0.0000000',
    provider: null,
    isLoading: false,
    error: null
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<{ name: string; publicKey: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'tip' | 'events' | 'history'>('leaderboard');

  // Handle Light / Dark Theme switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load live account transactions when wallet connects
  useEffect(() => {
    async function loadLiveTransactions() {
      if (walletState.publicKey) {
        const liveTxs = await fetchLiveAccountTransactions(walletState.publicKey);
        if (liveTxs.length > 0) {
          setTransactions(liveTxs);
        }
      }
    }
    loadLiveTransactions();
  }, [walletState.publicKey]);

  const handleWalletConnected = (newState: WalletState) => {
    setWalletState(newState);
  };

  const handleDemoConnect = async () => {
    const demoKey = 'GBRPYHIL2CI3FNLW4HJEX5C2T62S7LXZ4P63V7L7FVRKXZX4S4WV4567';
    let balance = '10000.0000000';
    try {
      balance = await fetchXlmBalance(demoKey);
    } catch (e) {
      // fallback
    }
    setWalletState({
      connected: true,
      publicKey: demoKey,
      network: 'Stellar Testnet',
      balance,
      provider: 'freighter',
      isLoading: false,
      error: null
    });
  };

  const handleDisconnect = () => {
    setWalletState({
      connected: false,
      publicKey: null,
      network: 'Stellar Testnet',
      balance: '0.0000000',
      provider: null,
      isLoading: false,
      error: null
    });
    setSelectedRecipient(null);
  };

  const handleRefreshBalance = async () => {
    if (!walletState.publicKey) return;
    setWalletState((prev) => ({ ...prev, isLoading: true }));
    try {
      const balance = await fetchXlmBalance(walletState.publicKey);
      setWalletState((prev) => ({ ...prev, balance, isLoading: false }));
    } catch (err) {
      setWalletState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleAddContributor = (newContrib: Contributor) => {
    setContributors((prev) => [newContrib, ...prev]);
  };

  const handleRemoveContributor = (id: string) => {
    setContributors((prev) => prev.filter(c => c.id !== id));
  };

  const handleSelectContributor = (contributor: { name: string; publicKey: string }) => {
    setSelectedRecipient(contributor);
    setActiveTab('tip');
  };

  const handleTransactionComplete = (record: TransactionRecord) => {
    setTransactions((prev) => [record, ...prev]);
    setTimeout(() => {
      handleRefreshBalance();
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header
        walletState={walletState}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onDisconnect={handleDisconnect}
        onRefreshBalance={handleRefreshBalance}
      />

      {/* Multi-Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onWalletConnected={handleWalletConnected}
      />

      {/* Main Content: Wallet Gated */}
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        {!walletState.connected ? (
          /* Landing Gate shown BEFORE wallet connection */
          <WalletGate
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            onDemoConnect={handleDemoConnect}
          />
        ) : (
          /* Main Platform Dashboard shown AFTER connecting wallet */
          <div className="animate-slide-up">
            {/* Banner Alert */}
            <div className="alert-box alert-info" style={{ marginBottom: '1.5rem' }}>
              <Info size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Wallet Connected:</strong> Accessing Stellar Testnet REST APIs, Soroban Smart Contracts, live balance fetching, and real-time transaction event logging.
              </div>
            </div>

            {/* Wallet Overview & Faucet Card */}
            <WalletCard
              walletState={walletState}
              onRefreshBalance={handleRefreshBalance}
            />

            {/* Navigation Tabs */}
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
              >
                <Award size={18} /> Contributor Leaderboard ({contributors.length})
              </button>

              <button
                className={`tab-btn ${activeTab === 'tip' ? 'active' : ''}`}
                onClick={() => setActiveTab('tip')}
              >
                <Send size={18} /> Soroban Contract & Rewards
                {selectedRecipient && (
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Selected</span>
                )}
              </button>

              <button
                className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <Activity size={18} /> Real-Time Contract Events
              </button>

              <button
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={18} /> Transaction History ({transactions.length})
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'leaderboard' && (
              <ContributorList
                contributors={contributors}
                onAddContributor={handleAddContributor}
                onRemoveContributor={handleRemoveContributor}
                onSelectContributor={handleSelectContributor}
              />
            )}

            {activeTab === 'tip' && (
              <TippingForm
                walletState={walletState}
                selectedRecipient={selectedRecipient}
                onTransactionComplete={handleTransactionComplete}
              />
            )}

            {activeTab === 'events' && (
              <ContractEvents />
            )}

            {activeTab === 'history' && (
              <TransactionHistory transactions={transactions} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem 0',
        background: 'var(--bg-card)',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            Built for <strong>Stellar Monthly Builder Challenge</strong> • Level 1 & Level 2 Submission
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Powered by <Sparkles size={14} color="var(--primary)" /> <strong>Soroban Smart Contracts & Stellar Horizon API</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
