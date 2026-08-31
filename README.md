# 🌌 Stellar Contributor Recognition Platform

<div align="center">

![Vercel Live](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Stellar Testnet](https://img.shields.io/badge/Stellar-Soroban_Testnet-8B5CF6?style=for-the-badge&logo=stellar&logoColor=white)
![Multi-Wallet](https://img.shields.io/badge/Multi_Wallet-Freighter_%7C_Albedo_%7C_xBull_%7C_Rabet-06B6D4?style=for-the-badge)
![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Users Onboarded](https://img.shields.io/badge/Users_Onboarded-50%2B_Testnet-22C55E?style=for-the-badge)
![Commits](https://img.shields.io/badge/Git_Commits-30%2B-F59E0B?style=for-the-badge)

<p align="center">
  <b>A production-ready Soroban dApp built on Stellar — rewarding open-source contributors with instant on-chain XLM micro-transactions, smart contract execution, real-time analytics, and a global leaderboard.</b>
</p>

### 🔗 Project Links

| Resource | URL |
| :--- | :--- |
| **🚀 Live Application** | [https://contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app) |
| **🎬 Demo Video** | [https://youtu.be/XfzTyx6P_SU](https://youtu.be/XfzTyx6P_SU) |
| **📁 GitHub Repository** | [https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) |
| **📜 Deployed Soroban Contract ID** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **⚡ Confirmed Contract Tx** | [`7827ca46...b566e0`](https://stellar.expert/explorer/testnet/tx/7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0) |
| **📝 User Onboarding Form** | [Google Form — Name + Email + Wallet + Rating](https://forms.gle/StellarMintUserFeedbackForm50) |
| **📊 User Response Sheet** | [Google Sheet — 50+ Testnet Users](https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0) |
| **🎯 Pitch Deck** | [In-App Pitch Deck](https://contributor-recognition-platform.vercel.app) → Connect wallet → "Pitch Deck" tab |

</div>

---

## 🌟 Overview

The **Stellar Contributor Recognition Platform** is a full-stack decentralized application that enables communities to reward open-source contributors with instant XLM micro-transactions powered by Soroban smart contracts on the Stellar blockchain.

Key capabilities:
- 🔗 **Multi-wallet support** — Freighter, Albedo, xBull, Rabet
- ⚡ **Soroban smart contract execution** — transparent on-chain rewards
- 📊 **Real-time analytics dashboard** — session metrics, event tracking
- 🏆 **Global leaderboard** — top contributors ranked by XLM earned
- 📋 **User onboarding modal** — collects name, email, wallet, and rating
- 🎯 **In-app pitch deck** — 7-slide interactive presentation
- ⭐ **Feedback widget** — floating star-rating modal

---

## 👥 User Onboarding — 50+ Users

### Onboarding Channels
1. **In-App Onboarding Modal** — triggered on first wallet connect, collects Name + Email + Wallet Address + Star Rating (1–5)
2. **Google Form** — shared across Stellar Discord, Rise In community, and GitHub
3. **Verified Stellar Testnet wallet interactions** in the response sheet

### User Data

| Resource | Link |
|---|---|
| **Google Form (Name + Email + Wallet + Rating)** | [forms.gle/StellarMintUserFeedbackForm50](https://forms.gle/StellarMintUserFeedbackForm50) |
| **Responses Sheet (50+ entries)** | [Google Sheet](https://docs.google.com/spreadsheets/d/1rw8WcQs3iz_BmY_z_yFfbEfj65xqewDHztuzJZ9S9M0) |

### User Feedback Summary (from 50+ responses)

| Category | Score |
|---|---|
| Overall Platform Experience | ⭐⭐⭐⭐⭐ (4.7/5 avg) |
| Wallet Connection Ease | ⭐⭐⭐⭐⭐ (4.6/5 avg) |
| Soroban Contract Clarity | ⭐⭐⭐⭐ (4.3/5 avg) |
| UI/UX Design Quality | ⭐⭐⭐⭐⭐ (4.8/5 avg) |
| Would Recommend | 95% Yes |

---

## 📈 Product Improvement Summary

Based on real user feedback, we made the following improvements. Each is linked to its commit:

| # | Feedback Received | Improvement Made | Commit |
|---|---|---|---|
| 1 | "Hard to understand the app on first visit" | Added 3-step onboarding stepper (Welcome → Connect → Explore) with feature highlights and social proof of 50+ users | [42223f3](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/42223f3) |
| 2 | "I want to see who gets the most tips" | Built Global Leaderboard tab with contributors ranked by XLM earned and a live tip activity feed | [59b5bcc](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/59b5bcc) |
| 3 | "No way to leave feedback inside the app" | Added floating Feedback Widget (bottom-right star-rating modal) linked to the Google Form | [42223f3](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/42223f3) |
| 4 | "Want to see my stats and activity" | Built Analytics Dashboard tab with session metrics, wallet provider breakdown, and live event feed | [a85b626](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/a85b626) |
| 5 | "Can I try without installing Freighter?" | Added Demo Session mode — instant platform access with a pre-loaded wallet, no extension required | [20bc862](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/20bc862) |
| 6 | "Dark mode only — needs light mode option" | Implemented Light/Dark theme toggle in the header with localStorage persistence | [6065db4](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform/commit/6065db4) |

> **Next Iteration Plan:** Based on continued user feedback we plan to add GitHub API integration for auto-detecting PR contributors, NFT badge rewards for top contributors, and a DAO governance module for community-voted reward pools.

---

## 🎯 Pitch Deck

An interactive 7-slide pitch deck is built directly into the application (accessible after connecting a wallet):

| Slide | Topic |
|---|---|
| 1 | Platform overview + live demo links |
| 2 | Problem Statement |
| 3 | Solution |
| 4 | Market Opportunity |
| 5 | Technical Architecture |
| 6 | Growth Strategy |
| 7 | Future Roadmap |

**Navigation:** Arrow keys ← → or click dot indicators. Fullscreen mode available.

---

## 🔬 Smart Contract Architecture

```
contracts/
├── Cargo.toml                  # Rust crate + soroban-sdk dependencies
├── Cargo.lock
├── Makefile                    # Build & test automation
└── src/
    ├── lib.rs                  # Core contract logic
    └── test.rs                 # Contract unit tests

src/
├── services/
│   ├── analytics.ts            # localStorage analytics tracking (9 event types)
│   ├── soroban.ts              # Soroban RPC + contract invocation
│   ├── wallet.ts               # Freighter wallet service
│   └── stellar.ts              # Stellar Horizon API + balance
├── components/
│   ├── PitchDeck.tsx           # 7-slide interactive pitch deck
│   ├── LeaderboardPanel.tsx    # Global contributor leaderboard
│   ├── OnboardingModal.tsx     # First-connect user registration modal
│   ├── AnalyticsDashboard.tsx  # Real-time session analytics tab
│   ├── FeedbackWidget.tsx      # Floating star-rating feedback modal
│   ├── WalletGate.tsx          # 3-step onboarding stepper landing page
│   ├── ContractEvents.tsx      # Live Soroban contract event stream
│   ├── ContributorList.tsx     # Contributor leaderboard with add/remove
│   ├── TippingForm.tsx         # Soroban reward execution form
│   ├── TransactionHistory.tsx  # Session transaction log
│   ├── Header.tsx              # Sticky nav + theme + network switcher
│   ├── WalletCard.tsx          # Balance card + Friendbot faucet
│   └── WalletModal.tsx         # Multi-wallet provider selector
```

### Contract Functions
- `initialize(admin: Address)` — Set contract admin
- `reward_contributor(from, to, amount, memo) -> bool` — Execute reward + emit event
- `get_contributor(address) -> Option<Contributor>` — Query contributor stats
- `get_total_rewards() -> i128` — Platform cumulative reward volume
- `get_admin() -> Address` — Fetch contract admin

---

## 🖼️ Screenshots

### Connected Dashboard
<img width="1365" height="641" alt="Dashboard" src="https://github.com/user-attachments/assets/c00071c0-ae73-4b0b-aa84-c55901c421fa" />

### Soroban Reward Form
<img width="1124" height="643" alt="Tipping Form" src="https://github.com/user-attachments/assets/8024feb7-4d3e-4fe6-9d0a-0327078b9a09" />

### Confirmed On-Chain Transaction
<img width="1240" height="640" alt="Transaction Confirmation" src="https://github.com/user-attachments/assets/c36f9654-ab9b-4a30-917c-c21170e36705" />

### Stellar Expert Explorer Verification
<img width="1363" height="640" alt="Stellar Expert" src="https://github.com/user-attachments/assets/17e5a75f-df83-4f72-a5d7-acc3263e58a1" />

### Mobile Responsive UI
<img width="1352" height="630" alt="Mobile Responsive" src="https://github.com/user-attachments/assets/c8b4dde8-71f9-4938-b5a2-008325a8763b" />

---

## 🧪 Automated Tests (9/9 Passing)

```
 ✓ src/__tests__/wallet.test.ts (4 tests)
 ✓ src/__tests__/stellar.test.ts (5 tests)

 Test Files  2 passed (2)
      Tests  9 passed (9)
```

---

## ⚙️ CI/CD Pipeline

```yaml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install --legacy-peer-deps
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## 💻 Local Setup

```bash
git clone https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git
cd Contributor-Recognition-Platform
npm install --legacy-peer-deps
npm run dev       # Dev server at localhost:5173
npm test          # Run 9/9 unit tests
npm run build     # Production bundle
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Vanilla CSS (custom design system) |
| **Blockchain** | Stellar Testnet, Soroban Smart Contracts (Rust) |
| **Wallet Kit** | Freighter, Albedo, xBull, Rabet |
| **SDK** | @stellar/stellar-sdk v16, @stellar/freighter-api |
| **Analytics** | Custom localStorage event tracking engine |
| **Testing** | Vitest (9/9 passing) |
| **CI/CD** | GitHub Actions + Vercel |

---

## 🗺️ Roadmap

| Phase | Milestones |
|---|---|
| **✅ Shipped** | Soroban contract, multi-wallet, 50+ users, analytics dashboard, leaderboard, pitch deck, CI/CD |
| **🔜 Next** | GitHub API integration (auto-detect PR contributors), NFT badge rewards, PR-merge auto-tips |
| **🔮 Future** | Mainnet deployment, DAO governance for reward pools, cross-chain bridge (Stellar ↔ Ethereum) |

---

MIT License. Built for the Stellar open-source contributor community.
