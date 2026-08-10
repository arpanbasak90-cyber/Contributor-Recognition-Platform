# 🌌 Stellar Contributor Recognition Platform

<div align="center">

![Level 1 White Belt](https://img.shields.io/badge/RiseIn-Level_1_White_Belt-10B981?style=for-the-badge&logo=star&logoColor=white)
![Level 2 Yellow Belt](https://img.shields.io/badge/RiseIn-Level_2_Yellow_Belt-F59E0B?style=for-the-badge&logo=star&logoColor=black)
![Level 3 Advanced](https://img.shields.io/badge/RiseIn-Level_3_Advanced-7C3AED?style=for-the-badge&logo=star&logoColor=white)
![Vercel Live](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Stellar Testnet](https://img.shields.io/badge/Stellar-Soroban_Testnet-8B5CF6?style=for-the-badge&logo=stellar&logoColor=white)
![Multi-Wallet](https://img.shields.io/badge/Multi_Wallet-Freighter_%7C_Albedo_%7C_xBull_%7C_Rabet-06B6D4?style=for-the-badge&logo=wallet&logoColor=white)

<p align="center">
  <b>A multi-wallet, Soroban smart contract dApp built on Stellar Testnet.</b><br />
  Empowering open-source communities to reward, tip, and appreciate contributors with instant on-chain micro-transactions.
</p>

### 🔗 Project Links

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-contributor--recognition--platform.vercel.app-10B981?style=for-the-badge)](https://contributor-recognition-platform.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/📁_GitHub_Repository-Contributor--Recognition--Platform-181717?style=for-the-badge&logo=github)](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git)

</div>

---

## 📸 Application Screenshots & Visual Verification

### 1. Wallet Gate Landing Screen
> Initial landing gate requiring users to connect a Stellar wallet (Freighter, Albedo, xBull, Rabet) before entering the application dashboard.

<img width="1352" height="630" alt="new 1" src="https://github.com/user-attachments/assets/c8b4dde8-71f9-4938-b5a2-008325a8763b" />

---

### 2. Connected Wallet & Live Dashboard
> Wallet connected state displaying the active public key, network selector (Testnet, Mainnet, Localhost), real-time Horizon XLM balance, and Friendbot Testnet Faucet trigger.

<img width="1365" height="641" alt="new 2" src="https://github.com/user-attachments/assets/c00071c0-ae73-4b0b-aa84-c55901c421fa" />


---

### 3. Contributor Leaderboard & Soroban Reward Suite
> Dynamic contributor leaderboard allowing users to register team members, select contributors, and execute on-chain XLM tips & Soroban smart contract calls.

<img width="1124" height="643" alt="new 3" src="https://github.com/user-attachments/assets/8024feb7-4d3e-4fe6-9d0a-0327078b9a09" />


---

### 4. Confirmed Soroban Contract Transaction Result
> Confirmed Soroban smart contract reward execution displaying the 64-character transaction hash, transacted XLM amount, contract address, and direct link to Stellar Expert Explorer.

<img width="1240" height="640" alt="new 4" src="https://github.com/user-attachments/assets/c36f9654-ab9b-4a30-917c-c21170e36705" />


---

### 5. On-Chain Ledger Verification on Stellar Expert Explorer
> Live confirmed transaction record on Stellar Expert Testnet (`7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0`) showing successful Soroban contract invocation and transaction signature.

<img width="1363" height="640" alt="new 5" src="https://github.com/user-attachments/assets/17e5a75f-df83-4f72-a5d7-acc3263e58a1" />


---

## 📋 Level 1 - White Belt Submission Checklist

| Level 1 Requirement | Feature / Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Wallet Setup** | Freighter Wallet integration (`@stellar/freighter-api`) configured for Stellar Testnet | ✅ Passed |
| **2. Wallet Connection** | Connect & Disconnect functionality with public key masking (`GAAZ...SKWW`) | ✅ Passed |
| **3. Balance Handling** | Real-time XLM balance queried directly from Stellar Horizon Testnet API (`https://horizon-testnet.stellar.org/accounts/{publicKey}`) | ✅ Passed |
| **4. Transaction Flow** | Send XLM transactions on Stellar testnet with preset amounts, memo field, and status feedback | ✅ Passed |
| **5. Transaction Result** | Displays success/failure state, full transaction hash, and direct link to [Stellar Expert Explorer](https://stellar.expert/explorer/testnet/) | ✅ Passed |
| **6. Public GitHub Repo** | Code pushed to [https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) | ✅ Passed |
| **7. README Documentation** | Project description, local setup guide, and screenshot verification section | ✅ Passed |

---

## 📋 Level 2 - Yellow Belt Submission Checklist

| Level 2 Requirement | Feature / Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Multi-Wallet Integration** | Integrated `WalletModal` supporting **Freighter**, **Albedo**, **xBull**, and **Rabet** wallets with status badges | ✅ Passed |
| **2. Deployed Contract Address** | Soroban Smart Contract deployed on Stellar Testnet: <br>`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` | ✅ Passed |
| **3. Contract Called from Frontend** | Invokes Soroban contract methods with status progression (`Pending` ➔ `Building` ➔ `Signing` ➔ `Confirmed`) | ✅ Passed |
| **4. 3 Handled Error Types** | Explicit error handling UI banners for: <br>• **`WALLET_NOT_FOUND`**: Missing extension <br>• **`USER_REJECTED`**: Signature cancelled <br>• **`INSUFFICIENT_BALANCE`**: Low balance | ✅ Passed |
| **5. Real-Time Event Sync** | Dedicated event stream view displaying live contract topics (`reward_contributor`, `tip_received`), JSON payloads, and hashes | ✅ Passed |
| **6. Minimum 2+ Commits** | Structured git commit history (`feat(level2)...` and `docs(level2)...`) pushed to GitHub | ✅ Passed |
| **7. Live Vercel Deployment** | Application live at [https://contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app) | ✅ Passed |

---

## 📋 Level 3 - Advanced Belt Submission Checklist

| Level 3 Requirement | Feature / Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Advanced Smart Contract Dev** | Soroban smart contract logic with event streaming, real-time updates, and transaction logging | ✅ Passed |
| **2. CI/CD Pipeline Setup** | GitHub Actions workflow (`.github/workflows/ci.yml`) for automated linting, testing, and production builds | ✅ Passed |
| **3. Mobile Responsive Frontend** | Mobile-first CSS layout with responsive breakpoint cards, navigation tabs, and touch-friendly controls | ✅ Passed |
| **4. Error Handling & Loading States** | Multi-state status feedback (`Pending` ➔ `Building` ➔ `Signing` ➔ `Confirmed`) with friendly error banners | ✅ Passed |
| **5. Test Suite (3+ Passing Tests)** | Unit test suite via Vitest (`npm test`) validating Soroban contract address, wallet detection, public key formatting, and error state mapping | ✅ Passed (4/4) |
| **6. Minimum 10+ Meaningful Commits** | Clean git history with 16+ structured commits covering features, docs, styling, and CI setup | ✅ Passed |
| **7. Production Architecture & Docs** | Comprehensive README documentation, local setup scripts, Vercel deployment, and test suite integration | ✅ Passed |

---

## 🔗 Key Submission Resources & Assets

| Asset | Link / Value |
| :--- | :--- |
| **Live Vercel Application** | [`https://contributor-recognition-platform.vercel.app`](https://contributor-recognition-platform.vercel.app) |
| **GitHub Repository** | [`https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) |
| **Deployed Soroban Contract Address** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **Live Confirmed Contract Call Tx Hash** | [`7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0`](https://stellar.expert/explorer/testnet/tx/7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0) |

---

## 💻 Local Installation & Setup

```bash
# 1. Clone repository
git clone https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git
cd Contributor-Recognition-Platform

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Run test suite
npm test

# 5. Build production bundle
npm run build
```

---

## 📜 License

MIT License. Built for the Stellar Community & RiseIn Monthly Builder Program.
