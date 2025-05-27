import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext.jsx";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
