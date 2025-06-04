import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useWeb3 } from "../../web3/context/Web3Context";
import styles from "./Header.module.css";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const { account, balance } = useWeb3();

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success("Address copied to clipboard!");
    }
  };

  const isActive = (path) => (location.pathname === path ? styles.active : "");

  return (
    <header className={`${styles.header} ${shrink ? styles.shrink : ""}`}>
      <div className={styles.logo} onClick={() => navigate("/dashboard")}>
        AI Balance
      </div>
      <nav className={styles.nav}>
        <button
          onClick={() => navigate("/dashboard")}
          className={isActive("/dashboard")}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/history")}
          className={isActive("/history")}
        >
          History
        </button>
        <button
          onClick={() => navigate("/goals")}
          className={isActive("/goals")}
        >
          Goals
        </button>
        <button
          onClick={() => navigate("/settings")}
          className={isActive("/settings")}
        >
          Settings
        </button>
        <button
          onClick={() => navigate("/about")}
          className={isActive("/about")}
        >
          About
        </button>
        <button onClick={() => navigate("/web3")} className={isActive("/web3")}>
          Web3
        </button>
        {account && (
          <button
            onClick={() =>
              window.open(`https://etherscan.io/address/${account}`, "_blank")
            }
            title="View on Etherscan"
            className={styles.accountBtn}
            onDoubleClick={copyAddress}
          >
            🦊 {account.slice(0, 6)}...{account.slice(-4)} (
            {parseFloat(balance).toFixed(4)} ETH)
          </button>
        )}
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
