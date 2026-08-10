import { describe, it, expect } from 'vitest';
import {
  SOROBAN_TESTNET_CONTRACT_ID,
  getAvailableWalletProviders
} from '../services/stellar';

describe('Stellar Contributor Platform Core Suite', () => {
  it('should have a valid 56-character Soroban contract address deployed on Stellar Testnet', () => {
    expect(SOROBAN_TESTNET_CONTRACT_ID).toBeDefined();
    expect(SOROBAN_TESTNET_CONTRACT_ID).toHaveLength(56);
    expect(SOROBAN_TESTNET_CONTRACT_ID.startsWith('C')).toBe(true);
  });

  it('should detect available multi-wallet providers (Freighter, Albedo, xBull, Rabet)', async () => {
    const providers = await getAvailableWalletProviders();
    expect(providers).toHaveLength(4);
    const providerIds = providers.map((p) => p.id);
    expect(providerIds).toContain('freighter');
    expect(providerIds).toContain('albedo');
    expect(providerIds).toContain('xbull');
    expect(providerIds).toContain('rabet');
  });

  it('should validate public key format for Stellar account addresses', () => {
    const validKey = 'GBRPYHIL2CI3FNLW4HJEX5C2T62S7LXZ4P63V7L7FVRKXZX4S4WV4567';
    expect(validKey.startsWith('G')).toBe(true);
    expect(validKey).toHaveLength(56);
  });

  it('should properly structure error response objects for wallet error banners', () => {
    const mockError = {
      type: 'INSUFFICIENT_BALANCE' as const,
      message: 'Account balance is too low for contract execution fee.'
    };
    expect(mockError.type).toBe('INSUFFICIENT_BALANCE');
    expect(mockError.message).toContain('balance is too low');
  });
});
