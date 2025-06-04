import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { getNFTsForAddress } from "../api/getNFTs";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [nfts, setNfts] = useState([]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);

      const balanceBigInt = await provider.getBalance(selectedAccount);
      const balanceInEth = ethers.formatEther(balanceBigInt);
      setBalance(balanceInEth);

      const userNfts = await getNFTsForAddress(selectedAccount);
      setNfts(userNfts);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <Web3Context.Provider value={{ account, balance, nfts, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
