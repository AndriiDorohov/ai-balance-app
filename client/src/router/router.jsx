import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import ReportPage from "../pages/ReportPage/ReportPage.jsx";
import GoalsPage from "../pages/GoalsPage/GoalsPage.jsx";
import HistoryPage from "../pages/HistoryPage/HistoryPage.jsx";
import SettingsPage from "../pages/SettingsPage/SettingsPage.jsx";

export default function createAppRouter() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </>,
    ),
  );
}
