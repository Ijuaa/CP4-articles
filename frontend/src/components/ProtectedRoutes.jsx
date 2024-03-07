import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes({ children }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      /* Si l'utiulisateur n'est pas connecté et que le chargement est fini, alors redirection vers le login */
      navigate("/login");
    } else if (!isLoading && user && user.role !== "administrateur") {
      /* Si l'utilisateur est chargé et n'est pas un administrateur, il est redirigé vers la 404 */
      navigate("/404");
    }
  }, [user, isLoading, navigate]);

  return !isLoading && user && user.role === "administrateur" ? (
    children
  ) : (
    <div>Chargement...</div>
  );
}

export default ProtectedRoutes;
