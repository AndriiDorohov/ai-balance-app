import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
  redirect,
} from "react-router-dom";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ReportPage from "../pages/ReportPage/ReportPage";
import GoalsPage from "../pages/GoalsPage/GoalsPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import MainLayout from "../layouts/MainLayout";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
};

export default function createAppRouter() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
            loader={requireAuth}
          />
          <Route path="/report" element={<ReportPage />} loader={requireAuth} />
          <Route path="/goals" element={<GoalsPage />} loader={requireAuth} />
          <Route
            path="/history"
            element={<HistoryPage />}
            loader={requireAuth}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
            loader={requireAuth}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </>,
    ),
  );
}
