import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  XCircle,
  HelpCircle
} from 'lucide-react';
import {
  WalletState,
  invokeSorobanContractOrPayment,
  TransactionRecord,
  SOROBAN_TESTNET_CONTRACT_ID
} from '../services/stellar';

interface TippingFormProps {
  walletState: WalletState;
  selectedRecipient?: { name: string; publicKey: string } | null;
  onTransactionComplete: (record: TransactionRecord) => void;
}

export const TippingForm: React.FC<TippingFormProps> = ({
  walletState,
  selectedRecipient,
  onTransactionComplete
}) => {
  const [recipient, setRecipient] = useState(selectedRecipient?.publicKey || '');
  const [amount, setAmount] = useState('10');
  const [memo, setMemo] = useState('Soroban Contributor Reward');
  const [isSorobanContract, setIsSorobanContract] = useState(true);
  
  const [statusState, setStatusState] = useState<'IDLE' | 'BUILDING' | 'SIGNING' | 'SUBMITTING' | 'CONFIRMED' | 'ERROR'>('IDLE');
  const [txResult, setTxResult] = useState<TransactionRecord | null>(null);
  const [errorDetails, setErrorDetails] = useState<{ type: string; message: string } | null>(null);

  React.useEffect(() => {
    if (selectedRecipient) {
      setRecipient(selectedRecipient.publicKey);
    }
  }, [selectedRecipient]);

  const executeTransaction = async (simulateErr: 'WALLET_NOT_FOUND' | 'USER_REJECTED' | 'INSUFFICIENT_BALANCE' | null = null) => {
    if (!walletState.connected || !walletState.publicKey) {
      setErrorDetails({
        type: 'WALLET_NOT_FOUND',
        message: 'No active wallet connected. Please connect via Freighter, Albedo, xBull, or Rabet.'
      });
      setStatusState('ERROR');
      return;
    }

    setStatusState('BUILDING');
    setErrorDetails(null);
    setTxResult(null);

    try {
      // Transition status indicators for live user feedback
      await new Promise(r => setTimeout(r, 600));
      setStatusState('SIGNING');
      await new Promise(r => setTimeout(r, 800));
      setStatusState('SUBMITTING');

      const record = await invokeSorobanContractOrPayment({
        senderPublicKey: walletState.publicKey,
        recipientPublicKey: recipient.trim(),
        amount: amount.trim(),
        memo: memo.trim(),
        isSorobanContract,
        simulateError: simulateErr
      });

      setStatusState('CONFIRMED');
      setTxResult(record);
      onTransactionComplete(record);
    } catch (err: any) {
      console.warn('Transaction error caught:', err);
      setStatusState('ERROR');
      setErrorDetails({
        type: err.type || 'GENERIC',
        message: err.message || 'Transaction submission failed on Stellar Testnet.'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTransaction(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <Cpu size={22} color="#C4B5FD" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {isSorobanContract ? 'Soroban Smart Contract Reward Call' : 'Native XLM Payment'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Execute contract invocations on Stellar Testnet with real-time status & error handling.
            </p>
          </div>
        </div>

        {/* Soroban Contract Mode Toggle */}
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', display: 'flex', gap: '0.25rem' }}>
          <button
            type="button"
            className={`btn ${isSorobanContract ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            onClick={() => setIsSorobanContract(true)}
          >
            <Cpu size={14} /> Soroban Contract
          </button>
          <button
            type="button"
            className={`btn ${!isSorobanContract ? 'btn-cyan' : 'btn-secondary'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            onClick={() => setIsSorobanContract(false)}
          >
            <Layers size={14} /> Native Payment
          </button>
        </div>
      </div>

      {isSorobanContract && (
        <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Target Testnet Contract:</span>{' '}
            <span className="font-mono" style={{ color: '#C4B5FD', fontWeight: 600 }}>{SOROBAN_TESTNET_CONTRACT_ID.substring(0, 18)}...</span>
          </div>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${SOROBAN_TESTNET_CONTRACT_ID}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#06B6D4', textDecoration: 'none', fontWeight: 600, fontSize: '0.78rem' }}
          >
            Contract Explorer <ExternalLink size={12} style={{ display: 'inline' }} />
          </a>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Recipient */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Recipient Contributor Stellar Address (Public Key)
          </label>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={statusState !== 'IDLE' && statusState !== 'CONFIRMED' && statusState !== 'ERROR'}
            required
          />
          {selectedRecipient && (
            <div style={{ fontSize: '0.8rem', color: '#06B6D4', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={14} /> Target Contributor: <strong>{selectedRecipient.name}</strong>
            </div>
          )}
        </div>

        {/* Amount & Presets */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Reward Amount (XLM)
            </label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Wallet Balance: {walletState.balance} XLM
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <input
              type="number"
              step="0.1"
              min="0.1"
              className="input-field font-mono"
              placeholder="10.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={statusState !== 'IDLE' && statusState !== 'CONFIRMED' && statusState !== 'ERROR'}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['5', '10', '25', '50', '100'].map((preset) => (
              <button
                key={preset}
                type="button"
                className={`btn ${amount === preset ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem' }}
                onClick={() => setAmount(preset)}
              >
                +{preset} XLM
              </button>
            ))}
          </div>
        </div>

        {/* Memo */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Contract Memo / Call Event Payload (Optional)
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Level 2 Reward Event"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={28}
          />
        </div>

        {/* Action Button & Status Bar */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
          disabled={statusState === 'BUILDING' || statusState === 'SIGNING' || statusState === 'SUBMITTING' || !recipient}
        >
          <Sparkles size={18} />
          {statusState === 'BUILDING' && 'Building Soroban XDR Payload...'}
          {statusState === 'SIGNING' && 'Awaiting Wallet Signature...'}
          {statusState === 'SUBMITTING' && 'Broadcasting to Stellar Testnet...'}
          {(statusState === 'IDLE' || statusState === 'CONFIRMED' || statusState === 'ERROR') && (
            isSorobanContract ? `Invoke Soroban Contract (${amount} XLM)` : `Send ${amount} XLM Payment`
          )}
        </button>
      </form>

      {/* Level 2 Error Handler Test Triggers */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          <HelpCircle size={15} color="#F59E0B" /> Test Required Level 2 Error Handlers (3 Error Types):
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-danger"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
            onClick={() => executeTransaction('WALLET_NOT_FOUND')}
          >
            Trigger: WALLET_NOT_FOUND
          </button>

          <button
            type="button"
            className="btn btn-danger"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
            onClick={() => executeTransaction('USER_REJECTED')}
          >
            Trigger: USER_REJECTED
          </button>

          <button
            type="button"
            className="btn btn-danger"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
            onClick={() => executeTransaction('INSUFFICIENT_BALANCE')}
          >
            Trigger: INSUFFICIENT_BALANCE
          </button>
        </div>
      </div>

      {/* Level 2 Error Feedback Banners */}
      {statusState === 'ERROR' && errorDetails && (
        <div className="alert-box alert-error animate-slide-up" style={{ marginTop: '1.25rem' }}>
          <XCircle size={22} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.9rem' }}>
              Error Handled [{errorDetails.type}]:
            </strong>
            <span style={{ fontSize: '0.85rem' }}>{errorDetails.message}</span>
          </div>
        </div>
      )}

      {/* Success Transaction Feedback Banner */}
      {statusState === 'CONFIRMED' && txResult && (
        <div className="alert-box alert-success animate-slide-up" style={{ marginTop: '1.25rem', flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={22} color="#10B981" />
            <strong style={{ fontSize: '1rem', color: '#A7F3D0' }}>
              {txResult.isSorobanContract ? 'Soroban Contract Call Confirmed on Stellar Testnet!' : 'XLM Payment Confirmed!'}
            </strong>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)', margin: '0.75rem 0 0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Amount Transacted:</span> <strong>{txResult.amount} XLM</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Recipient Account:</span> <span className="font-mono">{txResult.recipient}</span></div>
            {txResult.isSorobanContract && (
              <div><span style={{ color: 'var(--text-muted)' }}>Contract Address:</span> <span className="font-mono" style={{ color: '#67E8F9' }}>{txResult.contractAddress}</span></div>
            )}
            <div><span style={{ color: 'var(--text-muted)' }}>Memo / Payload:</span> {txResult.memo}</div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Transaction Hash:</span>
              <div className="font-mono" style={{ fontSize: '0.78rem', color: '#67E8F9', wordBreak: 'break-all', marginTop: '0.2rem' }}>
                {txResult.hash}
              </div>
            </div>
          </div>

          <a
            href={`https://stellar.expert/explorer/testnet/tx/${txResult.hash}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#06B6D4', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            Verify Contract Invocation on Stellar Expert <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
};
