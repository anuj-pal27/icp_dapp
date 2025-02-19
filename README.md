# `icp_wallet`

Welcome to your new `icp_wallet` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `icp_wallet`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)


## Running the project locally



### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/icp-wallet.git
cd icp-wallet
```

### 2. Install Dependencies
Navigate to the frontend directory and install dependencies:
```sh
cd src/icp_wallet_frontend
npm install
```

### 3. Start the Project
To run the frontend, execute:
```sh
npm run start
```

## Backend Setup

### 1. Start the ICP Local Replica
Ensure that you have `dfx` installed. If not, install it from [DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/setup/local-quickstart).
```sh
dfx start --background
```

### 2. Deploy Canisters
```sh
dfx deploy
```

### 3. Check Logs (Optional)
```sh
dfx canister call icp_wallet_backend get_balance '("your-wallet-address")'
```

## Features
- Connect to Plug Wallet
- Send and Receive Tokens
- View Balance

## Troubleshooting
- Ensure Plug Wallet is installed.
- Check `dfx start` is running before deploying.
- Verify canister IDs are correctly set in the frontend.

For more details, refer to the project documentation.