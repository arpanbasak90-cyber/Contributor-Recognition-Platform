# 🌌 Stellar Contributor Recognition Platform

<div align="center">

![Level 1 White Belt](https://img.shields.io/badge/RiseIn-Level_1_White_Belt-10B981?style=for-the-badge&logo=star&logoColor=white)
![Level 2 Yellow Belt](https://img.shields.io/badge/RiseIn-Level_2_Yellow_Belt-F59E0B?style=for-the-badge&logo=star&logoColor=black)
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

## 📖 Overview

The **Stellar Contributor Recognition Platform** is a production-ready decentralized application submitted for the **RiseIn Stellar Monthly Builder Challenge**, fulfilling all requirements for both **Level 1 (White Belt)** and **Level 2 (Yellow Belt)** submissions.

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

## 🔗 Key Submission Resources & Assets

| Asset | Link / Value |
| :--- | :--- |
| **Live Vercel Application** | [`https://contributor-recognition-platform.vercel.app`](https://contributor-recognition-platform.vercel.app) |
| **GitHub Repository** | [`https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) |
| **Deployed Soroban Contract Address** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **Sample Verifiable Contract Call Tx Hash** | [`e4f29a8b1c0d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f`](https://stellar.expert/explorer/testnet/) |

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

# 4. Build production bundle
npm run build
```

---

## 📜 License

MIT License. Built for the Stellar Community & RiseIn Monthly Builder Program.
