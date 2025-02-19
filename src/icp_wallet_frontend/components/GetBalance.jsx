import { Actor } from "@dfinity/agent";
import { idlFactory, canisterId } from "../../declarations/icp_wallet";

const walletActor = Actor.createActor(idlFactory, { canisterId });

export async function GetBalance() {
  try {
    const balance = await walletActor.getBalance();
    console.log("Wallet Balance:", balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}
