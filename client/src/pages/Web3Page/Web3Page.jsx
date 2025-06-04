import { useWeb3 } from "../../web3/context/Web3Context";
import styles from "./Web3Page.module.css";

export default function Web3Page() {
  const { account, balance, nfts, connectWallet } = useWeb3();

  return (
    <div className={styles.wrapper}>
      <h2>🔗 Web3 Integration</h2>

      {account ? (
        <>
          <p>
            ✅ Connected: <strong>{account}</strong>
          </p>
          <p>
            💰 Balance: <strong>{balance} ETH</strong>
          </p>

          <div className={styles.nfts}>
            <h3>Your NFTs</h3>

            {nfts.length > 0 ? (
              <div className={styles.nftGrid}>
                {nfts.map((nft, index) => (
                  <img
                    key={index}
                    src={nft.media?.[0]?.gateway || "/placeholder.png"}
                    alt={nft.title || `NFT ${index}`}
                    className={styles.nftImage}
                  />
                ))}
              </div>
            ) : (
              <p>No NFTs found for this address.</p>
            )}
          </div>
        </>
      ) : (
        <button className={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
