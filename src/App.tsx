import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WalletGate } from './components/WalletGate';
import { WalletCard } from './components/WalletCard';
import { WalletModal } from './components/WalletModal';
import { ContributorList } from './components/ContributorList';
import { TippingForm } from './components/TippingForm';
import { TransactionHistory } from './components/TransactionHistory';
import { ContractEvents } from './components/ContractEvents';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { FeedbackWidget } from './components/FeedbackWidget';
import {
  WalletState,
  TransactionRecord,
  Contributor,
  NetworkId,
  fetchXlmBalance
} from './services/stellar';
import { trackEvent, initSession } from './services/analytics';
import { Award, Send, History, Sparkles, Info, Activity, BarChart2 } from 'lucide-react';


export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [network, setNetwork] = useState<NetworkId>('testnet');
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
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'tip' | 'events' | 'history' | 'analytics'>('leaderboard');

  // Initialize session analytics on mount
  useEffect(() => { initSession(); }, []);

  // Handle Theme switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectNetwork = (newNetwork: NetworkId) => {
    setNetwork(newNetwork);
    const networkName = newNetwork === 'mainnet' ? 'Stellar Mainnet' : newNetwork === 'localhost' ? 'Localhost / Futurenet' : 'Stellar Testnet';
    setWalletState((prev) => ({ ...prev, network: networkName }));
  };

  const handleWalletConnected = (newState: WalletState) => {
    setWalletState(newState);
    if (newState.connected && newState.provider) {
      trackEvent('WALLET_CONNECTED', { provider: newState.provider });
    }
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
      network: network === 'mainnet' ? 'Stellar Mainnet' : network === 'localhost' ? 'Localhost / Futurenet' : 'Stellar Testnet',
      balance,
      provider: 'freighter',
      isLoading: false,
      error: null
    });
    trackEvent('DEMO_CONNECT');
  };

  const handleDisconnect = () => {
    trackEvent('WALLET_DISCONNECTED');
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
    trackEvent('CONTRIBUTOR_ADDED', { name: newContrib.name });
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
    trackEvent('TIP_SENT', { amount: parseFloat(record.amount), recipient: record.recipient.slice(0, 8) });
    setTimeout(() => {
      handleRefreshBalance();
    }, 1000);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    trackEvent('TAB_VIEWED', { tab });
  };

  const handleClearHistory = () => {
    setTransactions([]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header
        walletState={walletState}
        theme={theme}
        network={network}
        onSelectNetwork={handleSelectNetwork}
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
                <strong>Connected to {network.toUpperCase()}:</strong> Accessing Stellar REST APIs, Soroban Smart Contracts, live balance fetching, and real-time transaction logging.
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
                onClick={() => handleTabChange('leaderboard')}
                id="tab-leaderboard"
              >
                <Award size={18} /> Contributors ({contributors.length})
              </button>

              <button
                className={`tab-btn ${activeTab === 'tip' ? 'active' : ''}`}
                onClick={() => handleTabChange('tip')}
                id="tab-tip"
              >
                <Send size={18} /> Send Reward
                {selectedRecipient && (
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Selected</span>
                )}
              </button>

              <button
                className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => handleTabChange('events')}
                id="tab-events"
              >
                <Activity size={18} /> Contract Events
              </button>

              <button
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => handleTabChange('history')}
                id="tab-history"
              >
                <History size={18} /> Tx Log ({transactions.length})
              </button>

              <button
                className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleTabChange('analytics')}
                id="tab-analytics"
              >
                <BarChart2 size={18} /> Analytics
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
              <TransactionHistory
                transactions={transactions}
                onClearHistory={handleClearHistory}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard />
            )}
          </div>
        )}
      </main>

      {/* Floating Feedback Widget */}
      <FeedbackWidget />

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
            Built on <strong>Stellar Blockchain</strong> • Open Source Contributor Platform
            <span style={{ marginLeft: '0.75rem', background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '0.1rem 0.55rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-green)' }}>🟢 Level 4 MVP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Powered by <Sparkles size={14} color="var(--primary)" /> <strong>Soroban Smart Contracts & Stellar API</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
