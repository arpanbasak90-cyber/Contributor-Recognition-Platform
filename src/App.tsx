import React, { useState } from 'react';
import { Header } from './components/Header';
import { WalletCard } from './components/WalletCard';
import { WalletModal } from './components/WalletModal';
import { ContributorList } from './components/ContributorList';
import { TippingForm } from './components/TippingForm';
import { TransactionHistory } from './components/TransactionHistory';
import { ContractEvents } from './components/ContractEvents';
import {
  WalletState,
  TransactionRecord,
  fetchXlmBalance
} from './services/stellar';
import { Award, Send, History, Sparkles, Info, Activity } from 'lucide-react';

export const App: React.FC = () => {
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
  const [selectedRecipient, setSelectedRecipient] = useState<{ name: string; publicKey: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'tip' | 'events' | 'history'>('leaderboard');

  const handleWalletConnected = (newState: WalletState) => {
    setWalletState(newState);
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

      {/* Main Content */}
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        {/* Banner Alert for Level 2 Requirements */}
        <div className="alert-box alert-info" style={{ marginBottom: '1.5rem' }}>
          <Info size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Level 2 - Yellow Belt Submission dApp:</strong> Multi-wallet support (Freighter, Albedo, xBull, Rabet), Soroban Smart Contract invocation on Testnet, 3 explicit error handlers (`WALLET_NOT_FOUND`, `USER_REJECTED`, `INSUFFICIENT_BALANCE`), and real-time event streaming.
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
            <Award size={18} /> Contributor Leaderboard
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
          <ContributorList onSelectContributor={handleSelectContributor} />
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
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-glass)',
        padding: '1.5rem 0',
        background: 'rgba(10, 14, 23, 0.9)',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            Built for <strong>Stellar Monthly Builder Challenge</strong> • Level 2 Yellow Belt Submission
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Powered by <Sparkles size={14} color="#8B5CF6" /> <strong>Soroban Smart Contracts & Multi-Wallet Kit</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
