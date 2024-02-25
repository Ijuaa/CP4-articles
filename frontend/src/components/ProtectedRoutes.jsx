import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user && user.role === "administrateur";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/404");
    }
  }, [isAdmin, navigate]);

  return isAdmin ? children : null;
}

export default ProtectedRoutes;
