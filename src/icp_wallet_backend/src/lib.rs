use ic_cdk::export_candid;
use ic_cdk_macros::{query, update};
use std::collections::HashMap;
use std::cell::RefCell;

type Address = String;

#[derive(Default)]
struct Wallet {
    balances: HashMap<Address, u64>,
}

thread_local! {
    static WALLET: RefCell<Wallet> = RefCell::new(Wallet::default());
}

#[query]
fn get_balance(owner: Address) -> u64 {
    WALLET.with(|wallet| {
        *wallet.borrow().balances.get(&owner).unwrap_or(&0)
    })
}

#[update]
fn send_tokens(from: Address, to: Address, amount: u64) -> Result<(), String> {
    WALLET.with(|wallet| {
        let mut wallet = wallet.borrow_mut();

        let sender_balance = wallet.balances.entry(from.clone()).or_insert(0);
        if *sender_balance < amount {
            return Err("Insufficient funds".to_string());
        }

        *sender_balance -= amount;
        let receiver_balance = wallet.balances.entry(to).or_insert(0);
        *receiver_balance += amount;

        Ok(())
    })
}

#[update]
fn receive_tokens(receiver: Address, amount: u64) {
    WALLET.with(|wallet| {
        let mut wallet = wallet.borrow_mut();
        let balance = wallet.balances.entry(receiver).or_insert(0);
        *balance += amount;
    });
}

// 🔹 **New Function: Airdrop Tokens**
#[update]
fn airdrop_tokens(receiver: Address) -> String {
    let airdrop_amount: u64 = 100; // Amount of tokens to airdrop

    WALLET.with(|wallet| {
        let mut wallet = wallet.borrow_mut();
        let balance = wallet.balances.entry(receiver.clone()).or_insert(0);
        *balance += airdrop_amount;
    });

    format!("Airdropped {} IRCRC2 tokens to {}", airdrop_amount, receiver)
}

export_candid!();
