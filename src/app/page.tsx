"use client";

import React, { useState } from "react";
import Web3 from "web3";
import { useRouter } from "next/navigation";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      setIsLoading(true);
      const web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const balance = await web3.eth.getBalance(address);

      setWalletAddress(address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    } catch (error) {
      console.error("Error connecting wallet: ", error);
      alert("Error connecting wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Hawk Tuah Minting
        </h1>
        <div className="max-w-lg w-full text-center p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
          <p className="text-lg mb-8">
            Connect your MetaMask wallet to get started.
          </p>
          <button
            onClick={connectWallet}
            className={`bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-lg shadow transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
          {walletAddress && (
            <div className="mt-8 bg-gray-800 text-left p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Wallet Address:</p>
              <p className="text-lg font-mono break-all">{walletAddress}</p>
              <hr className="my-4 border-gray-600" />
              <p className="text-sm text-gray-400 mb-2">Balance:</p>
              <p className="text-lg font-semibold">{balance} ETH</p>
            </div>
          )}

          {walletAddress && (
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-6 py-3 rounded-lg shadow transition-all duration-300"
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </>
  );
}
