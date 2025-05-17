// src/components/TokenInfo.tsx
import { useState } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "../lib/erc20Abi";

const USDT_ADDRESS = "0xe677fea946a9abaa238b18472ac1f9763d919160";

export default function TokenInfo() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const loadTokenInfo = async () => {
    const provider = new ethers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/" + import.meta.env.VITE_INFURA_API_KEY
    );

    const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, provider);

    const tokenName = await contract.name();
    const tokenSymbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();

    setName(tokenName);
    setSymbol(tokenSymbol);
    setSupply(ethers.formatUnits(totalSupply, 6)); // USDT has 6 decimals
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-zinc-900 shadow rounded space-y-4 text-black dark:text-white">
      <h2 className="text-xl font-bold">📦 Token Info</h2>
      <button
        onClick={loadTokenInfo}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Load USDT Info
      </button>

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
