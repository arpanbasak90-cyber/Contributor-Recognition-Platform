import {
  isConnected as freighterIsConnected,
  isAllowed as freighterIsAllowed,
  setAllowed as freighterSetAllowed,
  getPublicKey as freighterGetPublicKey,
  signTransaction as freighterSignTransaction
} from '@stellar/freighter-api';

/**
 * Wallet Service Module conforming to Stellar / Soroban dApp standards.
 * Implements getAddress, setAllowed, signTransaction, getPublicKey, and isConnected.
 */

export async function isConnected(): Promise<boolean> {
  try {
    const res = await freighterIsConnected();
    return !!res;
  } catch (e) {
    return false;
  }
}

export async function isAllowed(): Promise<boolean> {
  try {
    const res = await freighterIsAllowed();
    return !!res;
  } catch (e) {
    return false;
  }
}

export async function setAllowed(): Promise<boolean> {
  try {
    const res = await freighterSetAllowed();
    return !!res;
  } catch (e) {
    return false;
  }
}

export async function getPublicKey(): Promise<string | null> {
  try {
    const res = await freighterGetPublicKey();
    if (typeof res === 'string') return res;
    if (res && typeof res === 'object' && 'publicKey' in res) {
      return (res as any).publicKey;
    }
    return res || null;
  } catch (e) {
    return null;
  }
}

export async function getAddress(): Promise<{ address: string; error?: string }> {
  try {
    const pubKey = await getPublicKey();
    if (pubKey) return { address: pubKey };
    return { address: '', error: 'Wallet not connected or user rejected access' };
  } catch (err: any) {
    return { address: '', error: err.message || 'Failed to retrieve address' };
  }
}

export async function signTransaction(
  xdr: string,
  opts?: { network?: string; networkPassphrase?: string; accountToSign?: string }
): Promise<string> {
  try {
    const signedXdr = await freighterSignTransaction(xdr, opts);
    if (typeof signedXdr === 'string') return signedXdr;
    if (signedXdr && (signedXdr as any).signedTxXdr) {
      return (signedXdr as any).signedTxXdr;
    }
    return xdr;
  } catch (err: any) {
    console.error('Wallet transaction signing error:', err);
    throw new Error(err.message || 'Transaction signing failed');
  }
}

export default {
  isConnected,
  isAllowed,
  setAllowed,
  getPublicKey,
  getAddress,
  signTransaction
};
