import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
