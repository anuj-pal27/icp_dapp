import React, { useState, useEffect } from "react";
import { icp_wallet_backend } from "../../declarations/icp_wallet_backend";

function WalletApp() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Connect to Plug Wallet
  async function connectWallet() {
    try {
      if (!window.ic || !window.ic.plug) {
        alert("Plug Wallet not found! Install it from the Chrome Web Store.");
        return;
      }

      const connected = await window.ic.plug.requestConnect();
      if (connected) {
        const principal = await window.ic.plug.agent.getPrincipal();
        setWalletAddress(principal.toText()); // Convert principal to string
        setIsAuthenticated(true);
        fetchBalance(principal.toText());
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  }

  // ✅ Fetch Wallet Balance
  async function fetchBalance(address) {
    try {
      const bal = await icp_wallet_backend.get_balance(address);
      setBalance(bal);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  // ✅ Send Tokens
  async function sendTokens() {
    try {
      if (!recipient || !amount) {
        alert("Enter recipient address and amount");
        return;
      }
      await icp_wallet_backend.send_tokens(walletAddress, recipient, parseInt(amount));
      alert("Transaction successful!");
      fetchBalance(walletAddress);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div>
      <h2>ICP Wallet</h2>

      {/* ✅ Connect Wallet Button */}
      {!isAuthenticated ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {walletAddress}</p>
      )}

      {/* ✅ Display Balance */}
      {isAuthenticated && (
        <>
          <h3>Balance: {balance} tokens</h3>

          {/* ✅ Send Tokens */}
          <div>
            <h4>Send Tokens</h4>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendTokens}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default WalletApp;
