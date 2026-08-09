import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { WalletState, sendXlmPayment, TransactionRecord } from '../services/stellar';

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
  const [memo, setMemo] = useState('Contributor Reward');
  const [loading, setLoading] = useState(false);
  const [txResult, setTxResult] = useState<TransactionRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update recipient if selected from contributor list
  React.useEffect(() => {
    if (selectedRecipient) {
      setRecipient(selectedRecipient.publicKey);
    }
  }, [selectedRecipient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletState.connected || !walletState.publicKey) {
      setErrorMsg('Please connect your Freighter wallet first.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setTxResult(null);

    try {
      const record = await sendXlmPayment({
        senderPublicKey: walletState.publicKey,
        recipientPublicKey: recipient.trim(),
        amount: amount.trim(),
        memo: memo.trim()
      });

      setTxResult(record);
      onTransactionComplete(record);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transaction submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetAmount = (val: string) => {
    setAmount(val);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <Send size={20} color="#C4B5FD" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Send XLM Payment / Reward</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Recognize open-source contributors with verified Stellar Testnet micro-transactions.
          </p>
        </div>
      </div>

      {!walletState.connected && (
        <div className="alert-box alert-warning">
          <AlertTriangle size={18} />
          <div>
            <strong>Wallet Disconnected:</strong> Connect your Freighter wallet to execute testnet payments.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Recipient Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Recipient Stellar Account (Public Key)
          </label>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={loading || !walletState.connected}
            required
          />
          {selectedRecipient && (
            <div style={{ fontSize: '0.8rem', color: '#06B6D4', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={14} /> Selected Contributor: <strong>{selectedRecipient.name}</strong>
            </div>
          )}
        </div>

        {/* Amount & Presets */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Amount (XLM)
            </label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Connected Balance: {walletState.balance} XLM
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <input
              type="number"
              step="0.1"
              min="0.1"
              className="input-field font-mono"
              placeholder="e.g. 10.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading || !walletState.connected}
              required
            />
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['5', '10', '25', '50', '100'].map((preset) => (
              <button
                key={preset}
                type="button"
                className={`btn ${amount === preset ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem' }}
                onClick={() => handlePresetAmount(preset)}
                disabled={loading || !walletState.connected}
              >
                +{preset} XLM
              </button>
            ))}
          </div>
        </div>

        {/* Memo Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Transaction Memo (Optional)
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Thanks for PR #42!"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={loading || !walletState.connected}
            maxLength={28}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
          disabled={loading || !walletState.connected || !recipient}
        >
          {loading ? (
            <>Processing Stellar Transaction...</>
          ) : (
            <>
              <Sparkles size={18} /> Send {amount || '0'} XLM Payment on Testnet
            </>
          )}
        </button>
      </form>

      {/* Transaction Feedback Notification States */}
      {errorMsg && (
        <div className="alert-box alert-error animate-slide-up" style={{ marginTop: '1.25rem' }}>
          <AlertTriangle size={20} />
          <div>
            <strong>Transaction Failed:</strong> {errorMsg}
          </div>
        </div>
      )}

      {txResult && (
        <div className="alert-box alert-success animate-slide-up" style={{ marginTop: '1.25rem', flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={22} color="#10B981" />
            <strong style={{ fontSize: '1rem', color: '#A7F3D0' }}>Transaction Successful on Stellar Testnet!</strong>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)', margin: '0.75rem 0 0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Amount Sent:</span> <strong>{txResult.amount} XLM</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Recipient:</span> <span className="font-mono">{txResult.recipient}</span></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Memo:</span> {txResult.memo}</div>
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
            Verify on Stellar Expert Explorer <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
};
