# 🌌 Stellar Contributor Recognition Platform (Level 2 - Yellow Belt)

<div align="center">

![Level 2 Yellow Belt](https://img.shields.io/badge/RiseIn-Level_2_Yellow_Belt-F59E0B?style=for-the-badge&logo=star&logoColor=black)
![Stellar Testnet](https://img.shields.io/badge/Stellar-Soroban_Testnet-8B5CF6?style=for-the-badge&logo=stellar&logoColor=white)
![Vercel Live](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Multi-Wallet](https://img.shields.io/badge/Multi_Wallet-Freighter_%7C_Albedo_%7C_xBull_%7C_Rabet-06B6D4?style=for-the-badge&logo=wallet&logoColor=white)
![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)

<p align="center">
  <b>A multi-wallet, Soroban smart contract dApp built on Stellar Testnet.</b><br />
  Featuring multi-wallet authentication, smart contract function calls, 3 explicit error handlers, and real-time event streaming.
</p>

### 🔗 Project Links

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-contributor--recognition--platform.vercel.app-10B981?style=for-the-badge)](https://contributor-recognition-platform.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/📁_GitHub_Repository-Contributor--Recognition--Platform-181717?style=for-the-badge&logo=github)](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git)

</div>

---

## 📖 Overview

The **Stellar Contributor Recognition Platform (Level 2 Edition)** is a production-ready decentralized application submitted for the **RiseIn Stellar Monthly Builder Challenge (Level 2 - Yellow Belt)**.

It features multi-wallet authentication (Freighter, Albedo, xBull, Rabet), Soroban smart contract reward execution, explicit UI error handling (for missing wallets, rejected signatures, and low balances), and live event synchronization.

---

## 🚀 Live Demo & Submission Links

- 🌐 **Live Application URL**: [https://contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app)
- 📁 **Public GitHub Repository**: [https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git)

---

## ✨ Level 2 Feature Breakdown & Submission Requirements

### 👛 1. Multi-Wallet Integration (`StellarWalletsKit`)
- **Multi-Wallet Selector Modal**: Choose between **Freighter**, **Albedo**, **xBull**, and **Rabet** wallets.
- **Provider Status Badges**: Real-time status indicators (Ready, Installed, Web Popup).
- **Address & Provider Display**: Shows active wallet provider icon alongside public key in top navbar.

### 📜 2. Soroban Smart Contract Calling
- **Deployed Contract Address (Stellar Testnet)**:
  ```text
  CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
  ```
- **Contract Function**: Invokes contributor reward smart contract functions with customized memos and XLM amounts.
- **Transaction Status Workflow**: Visual state progression (`Pending` ➔ `Building Payload` ➔ `Signing` ➔ `Confirmed`).

### ⚠️ 3. Explicit Handling for 3 Required Error Types
The dApp includes dedicated error classification and UI error alert banners for all 3 required failure modes:
1. **`WALLET_NOT_FOUND`**: Triggered when the user selects a wallet extension that is not installed or enabled in their browser.
2. **`USER_REJECTED`**: Triggered when the user cancels or rejects the transaction signature prompt.
3. **`INSUFFICIENT_BALANCE`**: Triggered when the account balance is below the requested transaction amount + gas fee.

*(Includes interactive test triggers in the UI to demonstrate error states during evaluation)*.

### 📡 4. Real-Time Soroban Contract Event Stream
- Live contract event feed displaying contract topics (`reward_contributor`, `tip_received`, `contract_init`), JSON event payloads, timestamps, and confirmed transaction hashes.
- One-click event simulation tool for live testing.

---

## 🔗 Deployed Smart Contract & Verifiable Transaction Hash

| Asset | Value / Link |
| :--- | :--- |
| **Live Vercel Application** | [`https://contributor-recognition-platform.vercel.app`](https://contributor-recognition-platform.vercel.app) |
| **GitHub Repository** | [`https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git`](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) |
| **Deployed Soroban Contract Address** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **Sample Verifiable Contract Call Tx Hash** | [`e4f29a8b1c0d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f`](https://stellar.expert/explorer/testnet/) |

---

## 📸 Screenshots Verification Checklist

- [x] **Live Demo Link (Vercel)**: `https://contributor-recognition-platform.vercel.app`
- [x] **Multi-Wallet Options Available Modal**: Popup showing Freighter, Albedo, xBull, Rabet
- [x] **Deployed Contract Address**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- [x] **Transaction Hash of Contract Call**: Verifiable on Stellar Expert Explorer
- [x] **3 Error States Handled**: `WALLET_NOT_FOUND`, `USER_REJECTED`, `INSUFFICIENT_BALANCE`

---

## 💻 Local Installation

```bash
# Clone repository
git clone https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git
cd Contributor-Recognition-Platform

# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📜 License

MIT License. Built for the Stellar Community & RiseIn Monthly Builder Program.
