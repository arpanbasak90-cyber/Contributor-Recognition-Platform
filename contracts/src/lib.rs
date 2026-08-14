#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Contributor {
    pub address: Address,
    pub total_rewards: i128,
    pub contribution_count: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RewardEvent {
    pub sender: Address,
    pub recipient: Address,
    pub amount: i128,
    pub memo: Symbol,
    pub timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Contributor(Address),
    TotalRewards,
}

#[contract]
pub struct ContributorRecognitionContract;

#[contractimpl]
impl ContributorRecognitionContract {
    /// Initialize contract with admin address
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TotalRewards, &i128::from(0));
    }

    /// Reward an open-source contributor on Stellar Testnet
    pub fn reward_contributor(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
        memo: Symbol,
    ) -> bool {
        from.require_auth();

        if amount <= 0 {
            panic!("Reward amount must be greater than zero");
        }

        // Update contributor record
        let key = DataKey::Contributor(to.clone());
        let mut contributor = env.storage().instance().get(&key).unwrap_or(Contributor {
            address: to.clone(),
            total_rewards: 0,
            contribution_count: 0,
        });

        contributor.total_rewards += amount;
        contributor.contribution_count += 1;
        env.storage().instance().set(&key, &contributor);

        // Update platform cumulative rewards
        let total_key = DataKey::TotalRewards;
        let current_total: i128 = env.storage().instance().get(&total_key).unwrap_or(0);
        env.storage().instance().set(&total_key, &(current_total + amount));

        // Emit real Soroban event
        env.events().publish(
            (symbol_short!("reward"), from.clone(), to.clone()),
            (amount, memo.clone(), env.ledger().timestamp()),
        );

        true
    }

    /// Retrieve contributor profile details
    pub fn get_contributor(env: Env, address: Address) -> Option<Contributor> {
        env.storage().instance().get(&DataKey::Contributor(address))
    }

    /// Retrieve total rewards distributed across platform
    pub fn get_total_rewards(env: Env) -> i128 {
        env.storage().instance().get(&DataKey::TotalRewards).unwrap_or(0)
    }

    /// Retrieve contract admin address
    pub fn get_admin(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Admin).expect("Not initialized")
    }

    /// Contract version & address metadata string
    pub fn contract_id(_env: Env) -> String {
        String::from_str(&_env, "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC")
    }
}

mod test;
