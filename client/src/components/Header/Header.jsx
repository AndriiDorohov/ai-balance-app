import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useWeb3 } from "../../web3/context/Web3Context";
import styles from "./Header.module.css";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, balance } = useWeb3();
  const { logout, token } = useAuth();
  const isAuthenticated = Boolean(token);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div
        className={styles.logo}
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
      >
        AI Balance
      </div>

      <nav className={styles.nav}>
        <button
          onClick={() => isAuthenticated && navigate("/dashboard")}
          className={`${isActive("/dashboard")} ${!isAuthenticated ? styles.disabled : ""}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => isAuthenticated && navigate("/history")}
          className={`${isActive("/history")} ${!isAuthenticated ? styles.disabled : ""}`}
        >
          History
        </button>
        <button
          onClick={() => isAuthenticated && navigate("/goals")}
          className={`${isActive("/goals")} ${!isAuthenticated ? styles.disabled : ""}`}
        >
          Goals
        </button>
        <button
          onClick={() => isAuthenticated && navigate("/settings")}
          className={`${isActive("/settings")} ${!isAuthenticated ? styles.disabled : ""}`}
        >
          Settings
        </button>
        <button
          onClick={() => isAuthenticated && navigate("/about")}
          className={`${isActive("/about")} ${!isAuthenticated ? styles.disabled : ""}`}
        >
          About
        </button>
        <button
          onClick={() => isAuthenticated && navigate("/web3")}
          className={`${isAuthenticated ? isActive("/web3") : ""} ${!isAuthenticated ? styles.disabled : ""}`}
        >
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
        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate("/login")}>Login/Register</button>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
