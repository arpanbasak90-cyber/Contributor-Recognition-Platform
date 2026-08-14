# 🌌 Stellar Contributor Recognition Platform

<div align="center">

![Level 1 White Belt](https://img.shields.io/badge/RiseIn-Level_1_White_Belt-10B981?style=for-the-badge&logo=star&logoColor=white)
![Level 2 Yellow Belt](https://img.shields.io/badge/RiseIn-Level_2_Yellow_Belt-F59E0B?style=for-the-badge&logo=star&logoColor=black)
![Level 3 Orange Belt](https://img.shields.io/badge/RiseIn-Level_3_Orange_Belt-EA580C?style=for-the-badge&logo=star&logoColor=white)
![Vercel Live](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Stellar Testnet](https://img.shields.io/badge/Stellar-Soroban_Testnet-8B5CF6?style=for-the-badge&logo=stellar&logoColor=white)
![Multi-Wallet](https://img.shields.io/badge/Multi_Wallet-Freighter_%7C_Albedo_%7C_xBull_%7C_Rabet-06B6D4?style=for-the-badge&logo=wallet&logoColor=white)
![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

<p align="center">
  <b>A full-stack, multi-wallet Soroban smart contract dApp built on Stellar Testnet.</b><br />
  Empowering open-source communities to reward, tip, and appreciate contributors with instant on-chain micro-transactions and smart contract execution.
</p>

### 🔗 Project Links & Live Resources

| Resource | URL / Address |
| :--- | :--- |
| **🚀 Live Application Demo** | [https://contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app) |
| **🎬 Demo Video (1–2 min)** | [https://youtu.be/XfzTyx6P_SU](https://youtu.be/XfzTyx6P_SU) |
| **📁 GitHub Repository** | [https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) |
| **📜 Deployed Soroban Contract ID** | [`CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC) |
| **⚡ Confirmed Contract Interaction Tx** | [`7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0`](https://stellar.expert/explorer/testnet/tx/7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0) |

</div>

---

## 📸 Application Screenshots & Visual Verification

### 1. Connected Wallet & Live Contributor Dashboard
> Displays the active Stellar public key, network badge, real-time Horizon XLM balance, Friendbot faucet trigger, and multi-wallet selection modal (Freighter, Albedo, xBull, Rabet).

<img width="1365" height="641" alt="Dashboard" src="https://github.com/user-attachments/assets/c00071c0-ae73-4b0b-aa84-c55901c421fa" />

---

### 2. Soroban Smart Contract Reward Suite & Interactive Tipping Form
> Contributor leaderboard allowing users to select contributors and invoke the Soroban smart contract with real-time status progression (`Pending` ➔ `Building` ➔ `Signing` ➔ `Confirmed`).

<img width="1124" height="643" alt="Tipping Form" src="https://github.com/user-attachments/assets/8024feb7-4d3e-4fe6-9d0a-0327078b9a09" />

---

### 3. Confirmed Soroban Contract Execution & Explorer Verification
> Confirmed smart contract reward execution displaying the 64-character transaction hash, transacted XLM amount, contract address, and direct link to Stellar Expert Explorer.

<img width="1240" height="640" alt="Transaction Confirmation" src="https://github.com/user-attachments/assets/c36f9654-ab9b-4a30-917c-c21170e36705" />

---

### 4. On-Chain Ledger Verification on Stellar Expert Explorer
> Live confirmed transaction record on Stellar Expert Testnet (`7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0`) showing successful Soroban contract invocation.

<img width="1363" height="640" alt="Stellar Expert" src="https://github.com/user-attachments/assets/17e5a75f-df83-4f72-a5d7-acc3263e58a1" />

---

### 5. Mobile Responsive UI Layout
> Fully responsive CSS design featuring touch-friendly cards, adaptive navigation headers, and flexible form layouts optimized for mobile and desktop viewports.

<img width="1352" height="630" alt="Landing Screen" src="https://github.com/user-attachments/assets/c8b4dde8-71f9-4938-b5a2-008325a8763b" />

---

### 6. Automated Vitest Test Suite (9 Passing Unit Tests)
```
 ✓ src/__tests__/wallet.test.ts (4 tests)
   ✓ should export getAddress function
   ✓ should export setAllowed function
   ✓ should export signTransaction function
   ✓ should handle wallet connection status check

 ✓ src/__tests__/stellar.test.ts (5 tests)
   ✓ should have a valid 56-character Soroban contract address deployed on Stellar Testnet
   ✓ should detect available multi-wallet providers (Freighter, Albedo, xBull, Rabet)
   ✓ should validate public key format for Stellar account addresses
   ✓ should properly structure error response objects for wallet error banners
   ✓ should instantiate Soroban contract and SDK helper methods correctly

 Test Files  2 passed (2)
      Tests  9 passed (9)
```

---

### 7. CI/CD GitHub Actions Pipeline
> Automated continuous integration pipeline (`.github/workflows/ci.yml`) performing checkout, dependency resolution, TypeScript type checking, unit test execution, and production bundling.

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

## 🛠️ Soroban Smart Contract Architecture

The smart contract is written in Rust (`soroban-sdk`) and located in the `contracts/` directory:

```
├── contracts/
│   ├── Cargo.toml                  # Rust crate configuration & soroban-sdk dependencies
│   ├── Cargo.lock                  # Lockfile for reproducible builds
│   ├── Makefile                    # Build & test automation targets
│   ├── lib.rs                      # Soroban smart contract source code
│   └── src/
│       ├── lib.rs                  # Core contract implementation
│       └── test.rs                 # Contract unit test suite
├── src/
│   ├── services/
│   │   ├── soroban.ts              # @stellar/stellar-sdk contract integration & RPC client
│   │   ├── wallet.ts               # Freighter wallet service (getAddress, setAllowed, signTransaction)
│   │   └── stellar.ts              # Stellar Horizon API & balance services
```

### Smart Contract Functions:
- `initialize(admin: Address)`: Configures contract admin and initial state.
- `reward_contributor(from: Address, to: Address, amount: i128, memo: Symbol) -> bool`: Executes contributor reward, records statistics, and publishes a Soroban event.
- `get_contributor(address: Address) -> Option<Contributor>`: Queries individual contributor stats.
- `get_total_rewards() -> i128`: Returns platform cumulative reward volume.
- `get_admin() -> Address`: Fetches contract administrator address.

---

## 📋 Comprehensive Submission Checklist

| # | Submission Item | Implementation Details | Status |
| :---: | :--- | :--- | :---: |
| **1** | **Public GitHub Repository** | [https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git](https://github.com/arpanbasak90-cyber/Contributor-Recognition-Platform.git) | ✅ Verified |
| **2** | **README with Complete Documentation** | Comprehensive architecture, contract details, screenshot verification, and local setup guide | ✅ Verified |
| **3** | **Minimum 10+ Meaningful Commits** | 20+ structured semantic git commits (`feat(...)`, `fix(...)`, `docs(...)`) | ✅ Verified |
| **4** | **Live Demo Link** | Application deployed on Vercel: [https://contributor-recognition-platform.vercel.app](https://contributor-recognition-platform.vercel.app) | ✅ Verified |
| **5** | **Contract Deployment Address** | Deployed Soroban Testnet Contract ID: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` | ✅ Verified |
| **6** | **Transaction Hash for Interaction** | Live confirmed contract execution: `7827ca46b2af77dbea3ff5c6c50baff633bf17989cab7a08861afad5fbf566e0` | ✅ Verified |
| **7** | **Screenshots Provided** | Mobile responsive UI, live dashboard, contract confirmation, and explorer verification included | ✅ Verified |
| **8** | **CI/CD Pipeline Running** | Automated GitHub Actions CI workflow in `.github/workflows/ci.yml` | ✅ Verified |
| **9** | **Test Output (3+ Passing Tests)** | Vitest unit test suite with **9/9 passing tests** validating wallet & Soroban SDK logic | ✅ Verified |
| **10** | **Demo Video Link (1–2 minutes)** | YouTube Video Walkthrough: [https://youtu.be/XfzTyx6P_SU](https://youtu.be/XfzTyx6P_SU) | ✅ Verified |

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

# 4. Run automated test suite
npm test

# 5. Build production bundle
npm run build
```

---

## 📜 License

MIT License. Built for the Stellar Community & Rise In Builder Program.
