# 🛠️ Building a Production Soroban dApp on Stellar: Lessons Learned

*A technical deep-dive into building, testing, and deploying a contributor reward platform using Rust, Soroban, and React.*

---

## Introduction

When I set out to build the Stellar Contributor Recognition Platform, my goal was simple: create a tool that lets open-source communities reward contributors with instant XLM micro-payments — transparently, borderlessly, and on-chain.

What followed was a journey through Soroban smart contracts, multi-wallet integration, production CI/CD, and real user onboarding. This post shares the key technical decisions, patterns, and lessons learned.

---

## 1. Why Stellar and Soroban?

Most developer reward tools use centralized payment rails (PayPal, Stripe). The problems:
- Slow settlement (1–5 business days)
- Geographic exclusion (no PayPal in 50+ countries)
- High fees (~3–5% per transaction)
- No transparency

Stellar solves all of these:
- **5-second finality** — contributors get paid instantly
- **Global access** — any wallet anywhere, no bank required
- **Near-zero fees** — 0.00001 XLM per operation
- **Full transparency** — every reward is verifiable on-chain

Soroban adds programmability — smart contracts that enforce reward rules, emit verifiable events, and can be upgraded.

---

## 2. Soroban Contract Architecture

The core contract (`contracts/src/lib.rs`) exposes five functions:

```rust
#[contractimpl]
impl ContributorReward {
    pub fn initialize(env: Env, admin: Address) { ... }
    pub fn reward_contributor(env: Env, from: Address, to: Address, amount: i128, memo: Symbol) -> bool { ... }
    pub fn get_contributor(env: Env, address: Address) -> Option<Contributor> { ... }
    pub fn get_total_rewards(env: Env) -> i128 { ... }
    pub fn get_admin(env: Env) -> Address { ... }
}
```

Key design decisions:
- **`Address::require_auth()`** — enforces that `from` must sign the transaction. No spoofing.
- **`env.events().publish()`** — every reward emits an on-chain event indexed by Horizon.
- **`i128` amounts** — avoids overflow on large rewards; Soroban''s `checked_add` prevents panics.

---

## 3. Multi-Wallet Integration Pattern

Supporting Freighter, Albedo, xBull, and Rabet required a unified wallet abstraction:

```typescript
// src/services/stellar.ts
export type WalletProviderId = "freighter" | "albedo" | "xbull" | "rabet";

async function connectWallet(provider: WalletProviderId): Promise<WalletState> {
  switch (provider) {
    case "freighter": return connectFreighter();
    case "albedo":    return connectAlbedo();
    case "xbull":     return connectXBull();
    case "rabet":     return connectRabet();
  }
}
```

The key insight: each wallet has different APIs, but they all return a `publicKey` and can `signTransaction(xdr)`. Abstract that interface and the UI stays clean.

---

## 4. Fee Bump Transactions (Gasless UX)

One UX friction point: users need XLM to pay fees before they can even receive their first reward. Fee Bump solves this elegantly.

```typescript
// src/services/feeBump.ts
const feeBumpTx = TransactionBuilder.buildFeeBumpTransaction(
  SPONSOR_PUBLIC_KEY,   // sponsor pays
  "1000",               // 1000 stroops = 0.0001 XLM
  innerTx,              // original user transaction
  networkPassphrase
);
```

The sponsor wraps the inner transaction. The inner tx signer (contributor) pays nothing. The sponsor account covers all fees. This is implemented per [CAP-0015](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md).

---

## 5. Analytics Without Third-Party Tools

For production analytics without sending data to third parties, I built a lightweight `localStorage`-based event engine:

```typescript
// src/services/analytics.ts
export function trackEvent(type: AnalyticsEventType, metadata?: Record<string, ...>): void {
  const events = getStoredEvents();
  const event = { id: uuid(), type, timestamp: new Date().toISOString(), metadata };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([event, ...events].slice(0, 200)));
}
```

9 event types tracked: `PAGE_VIEW`, `WALLET_CONNECTED`, `TIP_SENT`, `CONTRIBUTOR_ADDED`, `FEEDBACK_SUBMITTED`, etc. The rolling 200-event window keeps storage bounded.

---

## 6. CI/CD Pipeline

Every push runs:
1. `tsc --noEmit` — TypeScript type checking
2. `vitest run` — 9 unit tests
3. `vite build` — production bundle

This catches regressions before they reach Vercel.

---

## 7. Key Lessons

1. **Soroban auth is simple but strict** — `require_auth()` is one line, but forgetting it means anyone can impersonate any caller.
2. **Fee bumps unlock better UX** — Don''t make new users fund their wallet before they can be rewarded.
3. **Multi-wallet is a must** — Freighter alone excludes 60% of Stellar users. Support at least 3 wallets.
4. **Test with Vitest, not Jest** — Vite + Vitest is dramatically faster for TypeScript projects.
5. **Horizon events are powerful** — Subscribe to `contract_events` for real-time feed without a custom indexer.

---

## Resources

- [Soroban Docs](https://soroban.stellar.org)
- [Stellar SDK](https://github.com/stellar/js-stellar-sdk)
- [CAP-0015: Fee Bump Transactions](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md)
- [Freighter API](https://docs.freighter.app)
- [Platform Source Code](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform)

---

*Published as part of the Stellar Builder ecosystem contribution. August 2026.*
