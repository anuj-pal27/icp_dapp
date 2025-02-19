import React, { useState } from "react";
import { idlFactory, canisterId } from "../../../declarations/icp_wallet";


import { Button, Input } from "@/components/ui";

const walletActor = createActor(canisterId);

export default function ICPWallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const getBalance = async () => {
    try {
      const result = await walletActor.get_balance(address);
      setBalance(result);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const sendTokens = async () => {
    try {
      const result = await walletActor.send_tokens(address, receiver, Number(amount));
      setMessage(result ? "Transaction successful!" : "Transaction failed");
      getBalance();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">ICP Wallet</h1>
      <Input placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button onClick={getBalance}>Get Balance</Button>
      {balance !== null && <p className="text-lg">Balance: {balance} tokens</p>}
      <hr />
      <h2 className="text-xl">Send Tokens</h2>
      <Input placeholder="Receiver Address" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
      <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button onClick={sendTokens}>Send</Button>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
}
