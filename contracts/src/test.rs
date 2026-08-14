#![cfg(test)]
use super::*;
use soroban_sdk::testutils::{Address as _, Ledger};
use soroban_sdk::{symbol_short, Address, Env};

#[test]
fn test_initialize_and_reward() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContributorRecognitionContract);
    let client = ContributorRecognitionContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    assert_eq!(client.get_admin(), admin);

    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);

    env.mock_all_auths();

    let success = client.reward_contributor(
        &sender,
        &recipient,
        &100_0000000_i128,
        &symbol_short!("reward"),
    );

    assert!(success);
    assert_eq!(client.get_total_rewards(), 100_0000000_i128);

    let contributor = client.get_contributor(&recipient).unwrap();
    assert_eq!(contributor.address, recipient);
    assert_eq!(contributor.total_rewards, 100_0000000_i128);
    assert_eq!(contributor.contribution_count, 1);
}
