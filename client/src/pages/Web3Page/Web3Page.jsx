import React, { useState } from "react";
import { useWeb3 } from "../../web3/context/Web3Context";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import Button from "../../components/Button/Button";
import { FiCopy } from "react-icons/fi";
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
    <>
      <WavesLottie variant="default" />
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2 className={styles.title}>Web3 Integration 🔗</h2>
          <p className={styles.subheading}>
            Connect your wallet and explore your assets
          </p>
        </div>
        {loading ? (
          <p>Loading wallet data...</p>
        ) : account ? (
          <div className={styles.wrapper}>
            <p>
              <div className={styles.accountRow}>
                ✅ Connected: <strong>{account}</strong>
                <Button
                  onClick={copyAddress}
                  className="iconOnly"
                  title="Copy address"
                >
                  <FiCopy size={20} />
                </Button>
              </div>
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
                  {nfts.map((nft, index) => (
                    <div key={index} className={styles.nftCard}>
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
          </div>
        ) : (
          <div className={styles.centered}>
            <Button onClick={handleConnect} className="connect">
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
