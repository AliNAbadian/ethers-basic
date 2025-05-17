"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "../lib/erc20Abi";

export default function TokenInfoInput() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [error, setError] = useState("");

  const loadTokenInfo = async () => {
    try {
      setError("");
      const provider = new ethers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/" + import.meta.env.VITE_INFURA_API_KEY
      );

      if (!ethers.isAddress(tokenAddress)) {
        throw new Error("Invalid Ethereum address");
      }

      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

      const tokenName = await contract.name();
      const tokenSymbol = await contract.symbol();
      const totalSupply = await contract.totalSupply();

      setName(tokenName);
      setSymbol(tokenSymbol);
      setSupply(ethers.formatUnits(totalSupply, 18)); // Most tokens use 18 decimals
    } catch (err: any) {
      setError(err.message);
      setName("");
      setSymbol("");
      setSupply("");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow space-y-4 text-black dark:text-white">
      <h2 className="text-xl font-bold">🧠 Read Token Info</h2>
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter ERC20 token address"
        className="w-full px-3 py-2 border rounded text-sm"
      />
      <button
        onClick={loadTokenInfo}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Token Info
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {name && (
        <div className="space-y-1">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Symbol:</strong> {symbol}
          </p>
          <p>
            <strong>Total Supply:</strong> {supply}
          </p>
        </div>
      )}
    </div>
  );
}
