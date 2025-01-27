"use client";

import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          setWalletAddress(account);
          const balance = await web3.eth.getBalance(account);
          setBalance(web3.utils.fromWei(balance, "ether") + " ETH");
        } catch (error) {
          console.error("Error connecting wallet: ", error);
        }
      } else {
        alert("Please install MetaMask");
      }
    };

    fetchWalletDetails();
  }, []);

  const abbreviatedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.substring(
        walletAddress.length - 4
      )}`
    : null;

  return (
    <>
      <div className="bg-gray-800 h-16 w-full flex justify-between items-center px-4">
        <p className="text-lg p-2">
          Wallet Address:{" "}
          <span className="font-bold">{abbreviatedAddress}</span>
        </p>
        <p className="text-lg p-2">
          Balance: <span className="font-bold">{balance}</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center m-6">
        <h1 className="text-3xl md:text-4xl font-bold">Hello World!</h1>
      </div>
    </>
  );
}
