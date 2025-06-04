import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { useWeb3 } from "../../web3/context/Web3Context";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { account, connectWallet } = useWeb3();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`${styles.header} ${scrolled ? styles.shrink : ""}`}>
      <div className={styles.logo} onClick={() => navigate("/dashboard")}>
        AI Balance
      </div>
      <nav className={styles.nav}>
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "History", path: "/history" },
          { label: "Goals", path: "/goals" },
          { label: "Settings", path: "/settings" },
          { label: "About", path: "/about" },
        ].map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={isActive(path) ? styles.active : ""}
          >
            {label}
          </button>
        ))}
        {account ? (
          <span className={styles.account}>
            🦊 {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button onClick={connectWallet} className={styles.walletBtn}>
            Connect Wallet
          </button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
