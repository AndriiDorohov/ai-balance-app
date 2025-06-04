import React, { useState } from "react";
import { useWeb3 } from "../../web3/context/Web3Context";
import styles from "./Web3Page.module.css";

export default function Web3Page() {
  const { account, balance, nfts, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectWallet();
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      alert("Address copied to clipboard!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>🔗 Web3 Integration</h2>
      {loading ? (
        <p>Loading wallet data...</p>
      ) : account ? (
        <>
          <p>
            ✅ Connected: <strong>{account}</strong>
            <button
              onClick={copyAddress}
              className={styles.button}
              style={{
                marginLeft: "10px",
                padding: "0.3rem 0.6rem",
                fontSize: "0.8rem",
              }}
            >
              Copy
            </button>
          </p>
          <p>
            💰 Balance: <strong>{balance ?? "0.0"} ETH</strong>
          </p>

          <div className={styles.nfts}>
            <h3>Your NFTs:</h3>
            {nfts.length === 0 ? (
              <p>No NFTs found for this wallet.</p>
            ) : (
              <div className={styles.nftGrid}>
                {nfts.map((nft) => (
                  <div key={nft.id} className={styles.nftCard}>
                    <img
                      src={nft.media?.[0]?.gateway || "/fallback-image.png"}
                      alt={nft.title || "NFT image"}
                      className={styles.nftImage}
                      onError={(e) =>
                        (e.currentTarget.src = "/fallback-image.png")
                      }
                    />
                    <p>{nft.title || "No title"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <button className={styles.button} onClick={handleConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
