import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/dashboard")}>
        AI Balance
      </div>
      <nav className={styles.nav}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/history")}>History</button>
        <button onClick={() => navigate("/goals")}>Goals</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
