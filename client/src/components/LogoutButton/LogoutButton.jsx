import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
