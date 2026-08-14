import { describe, it, expect, vi } from 'vitest';
import { getAddress, setAllowed, signTransaction, isConnected } from '../services/wallet';

describe('Wallet Service Functions (getAddress, setAllowed, signTransaction)', () => {
  it('should export getAddress function', () => {
    expect(typeof getAddress).toBe('function');
  });

  it('should export setAllowed function', () => {
    expect(typeof setAllowed).toBe('function');
  });

  it('should export signTransaction function', () => {
    expect(typeof signTransaction).toBe('function');
  });

  it('should handle wallet connection status check', async () => {
    const status = await isConnected();
    expect(typeof status).toBe('boolean');
  });
});
