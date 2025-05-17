// src/components/WalletConnect.tsx
import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");

    // Request access to wallet
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    const rawBalance = await provider.getBalance(userAddress);

    // provider.destroy

    setAddress(userAddress);
    setBalance(ethers.formatEther(rawBalance)); // Convert wei → ETH
  };

  console.log(address, balance);

  return (
    <div className="p-6 max-w-md mx-auto shadow-xl rounded-xl space-y-4 bg-white dark:bg-zinc-900 text-black dark:text-white">
      <h2 className="text-xl font-bold">🦊 Wallet Connect</h2>
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Connect MetaMask
      </button>

      {address && (
        <div className="space-y-2">
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance} ETH
          </p>
        </div>
      )}
    </div>
  );
}
