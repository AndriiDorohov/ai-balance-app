import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import styles from "./TopNav.module.css";

export default function TopNav() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <span className={styles.logo} onClick={() => navigate("/dashboard")}>
        AI Balance
      </span>
      <ul className={styles.links}>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/history")}>History</li>
        <li onClick={() => navigate("/goals")}>Goals</li>
        <li onClick={() => navigate("/settings")}>Settings</li>
        <li onClick={() => navigate("/web3")}>Web3</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
}
