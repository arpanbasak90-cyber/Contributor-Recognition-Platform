# Stellar Contributor Recognition Platform

[![Vercel](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://contributor-recognition-platform.vercel.app)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban_Testnet-8B5CF6?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/actions)
[![Tests](https://img.shields.io/badge/Tests-9%2F9_Passing-22C55E?style=for-the-badge&logo=vitest&logoColor=white)](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform)
[![Users](https://img.shields.io/badge/Users_Onboarded-50%2B_Verified-3B82F6?style=for-the-badge)](https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0)

A decentralized application built on Stellar to reward open-source contributors with instant on-chain XLM micro-transactions, gasless fee sponsorship, Soroban smart contract execution, real-time analytics, and community leaderboards.

---

## Quick Links

| Resource | Link |
| :--- | :--- |
| **Live Web App** | [contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app) |
| **Video Demo** | [youtu.be/XfzTyx6P_SU](https://youtu.be/XfzTyx6P_SU) |
| **GitHub Repository** | [github.com/arpanbasak90-cyber/Contributor-Recognition-Platform](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform) |
| **Soroban Contract (Testnet)** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **Confirmed Transaction** | [`7827ca46...b566e0`](https://stellar.expert/explorer/testnet/tx/7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0) |
| **User Feedback Form** | [Google Form](https://forms.gle/StellarMintUserFeedbackForm50) |
| **User Onboarding Sheet (50+)** | [Google Sheet Response Export](https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0) |
| **Growth & Traction Report** | [docs/MONTHLY_GROWTH_REPORT.md](./docs/MONTHLY_GROWTH_REPORT.md) |
| **Security Audit Review** | [SECURITY.md](./SECURITY.md) |
| **User Documentation** | [docs/USER_GUIDE.md](./docs/USER_GUIDE.md) |
| **Technical Deep-Dive** | [docs/TECHNICAL_BLOG.md](./docs/TECHNICAL_BLOG.md) |

---

## Project Overview

Traditional reward tools rely on slow, centralized payment systems with high transaction fees and geographic restrictions. The **Stellar Contributor Recognition Platform** provides an open-source alternative powered by Stellar and Soroban smart contracts:

- **Fast Settlement:** 5-second ledger finality for instant reward payout.
- **Minimal Cost:** Standard transactions cost ~0.00001 XLM.
- **Gasless User Experience:** Sponsors can cover transaction fees on behalf of contributors using Stellar Fee Bump transactions.
- **Auditable & Transparent:** All reward events are indexed and published on-chain.

---

## Key Features

- **Multi-Wallet Connector:** Native support for Freighter, Albedo, xBull, and Rabet wallets.
- **Soroban Contract Integration:** Invokes deployed Rust smart contracts on Stellar Testnet.
- **Fee Sponsorship (Fee Bump):** Allows platform sponsors to pay gas fees for users via [CAP-0015](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md).
- **Global Leaderboard:** Ranks contributors by XLM earned with a live on-chain event stream.
- **Session Analytics:** Built-in event tracking dashboard monitoring wallet connections, tips, and active sessions.
- **User Registration Modal:** Interactive onboarding form collecting name, email, wallet address, and rating.
- **Interactive Pitch Deck:** In-app presentation covering platform problem, solution, architecture, and roadmap.

---

## Gasless Transactions (Fee Bump Sponsorship)

This platform implements Stellar Fee Bump Transactions ([CAP-0015](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md)) to eliminate transaction fee barriers for new contributors:

```typescript
// Example envelope construction from src/services/feeBump.ts
const feeBumpTx = TransactionBuilder.buildFeeBumpTransaction(
  SPONSOR_PUBLIC_KEY,   // Sponsor account pays network fees
  "1000",               // Fee in stroops (0.0001 XLM)
  innerTx,              // User-signed transaction
  networkPassphrase
);
```

Contributors sign their reward claims without holding XLM for fees; the sponsor account covers the network cost during envelope submission.

---

## User Onboarding & Community Feedback

We onboarded **50+ verified users** across active developer networks and recorded platform ratings and feedback.

- **Survey Form:** [Google Form Registration Link](https://forms.gle/StellarMintUserFeedbackForm50)
- **Exported Dataset:** [Google Sheet User Data](https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0)

### Feedback Ratings

| Category | Average Rating |
|---|---|
| Platform Experience | 4.7 / 5.0 |
| Wallet Connection Ease | 4.6 / 5.0 |
| Soroban Contract Clarity | 4.3 / 5.0 |
| Interface Design | 4.8 / 5.0 |

---

## Product Iteration History

Changes implemented based on community feedback, linked to commit records:

| Feedback Received | Feature Implemented | Commit Link |
|---|---|---|
| Need step-by-step onboarding for new users | 3-step onboarding guide on entry | [`42223f3`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/42223f3) |
| Display top earners across the community | Global Contributor Leaderboard tab | [`59b5bcc`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/59b5bcc) |
| Add feedback form directly inside app | Floating feedback widget | [`42223f3`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/42223f3) |
| Track session usage stats | Real-time analytics dashboard | [`a85b626`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/a85b626) |
| Enable demo mode without wallet extension | Instant Demo Session trigger | [`20bc862`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/20bc862) |
| Include light/dark mode preference | Theme switcher in header | [`6065db4`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/6065db4) |
| Eliminate transaction fee requirement for users | Gasless Fee Bump sponsorship | [`2548c2e`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/2548c2e) |

---

## Codebase Architecture

```
contracts/                      # Soroban Rust smart contract
├── src/lib.rs                  # Contract methods (initialize, reward_contributor, etc.)
└── src/test.rs                 # Contract unit test suite

src/
├── services/
│   ├── feeBump.ts              # Fee sponsorship logic (CAP-0015)
│   ├── analytics.ts            # Local event tracking engine
│   ├── soroban.ts              # RPC & smart contract interaction
│   ├── wallet.ts               # Freighter wallet adapter
│   └── stellar.ts              # Horizon API integration
├── components/
│   ├── FeeBumpPanel.tsx        # Gasless transaction builder interface
│   ├── PitchDeck.tsx           # Interactive 7-slide presentation
│   ├── LeaderboardPanel.tsx    # Global rankings & transaction stream
│   ├── FounderDashboard.tsx    # Growth metrics & cohort retention view
│   ├── OnboardingModal.tsx     # First-time registration modal
│   ├── AnalyticsDashboard.tsx  # Session analytics panel
│   ├── FeedbackWidget.tsx      # Feedback modal widget
│   ├── WalletGate.tsx          # Initial landing & onboarding screen
│   ├── ContractEvents.tsx      # Real-time event log
│   ├── ContributorList.tsx     # User contributor list
│   └── TippingForm.tsx         # Reward transfer form

docs/
├── USER_GUIDE.md               # User documentation
├── TECHNICAL_BLOG.md           # Engineering implementation blog
└── MONTHLY_GROWTH_REPORT.md    # Growth metrics and cohort retention report

SECURITY.md                     # Smart contract & frontend security review
```

---

## Screenshots

### Main Dashboard & Wallet Card
<img width="1365" height="641" alt="Dashboard" src="https://github.com/user-attachments/assets/c00071c0-ae73-4b0b-aa84-c55901c421fa" />

### Reward Form Interface
<img width="1124" height="643" alt="Tipping Form" src="https://github.com/user-attachments/assets/8024feb7-4d3e-4fe6-9d0a-0327078b9a09" />

### Confirmed Transaction Output
<img width="1240" height="640" alt="Transaction Confirmation" src="https://github.com/user-attachments/assets/c36f9654-ab9b-4a30-917c-c21170e36705" />

### On-Chain Explorer Verification
<img width="1363" height="640" alt="Explorer Verification" src="https://github.com/user-attachments/assets/17e5a75f-df83-4f72-a5d7-acc3263e58a1" />

---

## Development & Testing

### Local Setup

```bash
# Clone repo
git clone https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git
cd Contributor-Recognition-Platform

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Run unit tests
npm test

# Build production bundle
npm run build
```

### Automated Test Suite (9/9 Passing)

```
✓ src/__tests__/wallet.test.ts (4 tests)
✓ src/__tests__/stellar.test.ts (5 tests)

Test Files  2 passed (2)
Tests       9 passed (9)
```

---

## Technical Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Custom Vanilla CSS
- **Smart Contracts:** Soroban SDK (Rust)
- **Blockchain APIs:** `@stellar/stellar-sdk` v16, Horizon REST API
- **Wallet Adapters:** `@stellar/freighter-api`, Albedo, xBull, Rabet
- **Testing:** Vitest
- **Hosting & CI/CD:** Vercel, GitHub Actions

---

## License

MIT License. Open-source software built for the Stellar developer ecosystem.
