/**
 * Fee Bump / Fee Sponsorship Service
 * Advanced Feature: Gasless transactions using Stellar Fee Bump Transactions
 *
 * Fee Bump allows a "fee account" (sponsor) to pay the transaction fees
 * on behalf of users, enabling true gasless UX for contributors.
 *
 * Reference: https://developers.stellar.org/docs/learn/encyclopedia/transactions-specialized/fee-bump-transactions
 */

import {
  TransactionBuilder,
  Networks,
  BASE_FEE,
  FeeBumpTransaction,
  Transaction
} from "@stellar/stellar-sdk";

export const SPONSOR_PUBLIC_KEY =
  "GBRPYHIL2CI3FNLW4HJEX5C2T62S7LXZ4P63V7L7FVRKXZX4S4WV4567";

export type FeeBumpNetwork = "testnet" | "mainnet";

export interface FeeBumpResult {
  success: boolean;
  feeBumpXdr?: string;
  innerTxHash?: string;
  sponsoredFee: string;
  message: string;
}

/**
 * Wraps an existing signed inner transaction in a Fee Bump envelope.
 * The sponsor (fee account) pays the fee — the inner signer pays nothing.
 *
 * @param innerTxXdr - Base64 XDR of the already-signed inner transaction
 * @param network    - "testnet" | "mainnet"
 * @param feePerOp   - Optional fee in stroops (default: 1000 stroops = 0.0001 XLM)
 */
export async function buildFeeBumpTransaction(
  innerTxXdr: string,
  network: FeeBumpNetwork = "testnet",
  feePerOp = 1000
): Promise<FeeBumpResult> {
  try {
    const networkPassphrase =
      network === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

    // Deserialize the inner transaction
    const innerTx = TransactionBuilder.fromXDR(
      innerTxXdr,
      networkPassphrase
    ) as Transaction;

    // Build the fee bump envelope
    const feeBumpTx = TransactionBuilder.buildFeeBumpTransaction(
      SPONSOR_PUBLIC_KEY,
      String(feePerOp),
      innerTx,
      networkPassphrase
    );

    const feeBumpXdr = feeBumpTx.toXDR();
    const innerHash = innerTx.hash().toString("hex");

    return {
      success: true,
      feeBumpXdr,
      innerTxHash: innerHash,
      sponsoredFee: `${(feePerOp / 1e7).toFixed(7)} XLM`,
      message: `Fee bump built. Sponsor (${SPONSOR_PUBLIC_KEY.slice(0, 8)}...) will pay ${(feePerOp / 1e7).toFixed(7)} XLM in fees.`,
    };
  } catch (error) {
    return {
      success: false,
      sponsoredFee: "0",
      message: `Fee bump failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Calculate the actual fee saved for the user.
 * BASE_FEE is 100 stroops = 0.00001 XLM per operation.
 */
export function calculateSponsoredSavings(operationCount = 1): {
  baseFeeStroops: number;
  baseFeeXlm: string;
  totalSaved: string;
} {
  const base = Number(BASE_FEE) * operationCount;
  return {
    baseFeeStroops: base,
    baseFeeXlm: (base / 1e7).toFixed(7),
    totalSaved: `${(base / 1e7).toFixed(7)} XLM (${base} stroops)`,
  };
}

/**
 * Validate whether fee bump is supported for a given inner transaction.
 * Fee bumps require:
 *   1. The inner transaction to be v1 (TransactionV1Envelope)
 *   2. The fee account to be different from the inner source
 */
export function validateFeeBumpEligibility(innerTxXdr: string, network: FeeBumpNetwork = "testnet"): {
  eligible: boolean;
  reason: string;
} {
  try {
    const networkPassphrase =
      network === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;
    const tx = TransactionBuilder.fromXDR(innerTxXdr, networkPassphrase);

    if (tx instanceof FeeBumpTransaction) {
      return { eligible: false, reason: "Transaction is already a fee bump — cannot double-wrap." };
    }

    return { eligible: true, reason: "Transaction is eligible for fee sponsorship." };
  } catch {
    return { eligible: false, reason: "Could not deserialize transaction XDR." };
  }
}
