import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes({ children }) {
  const { user, isLoading } = useAuth(); // Supposons que isLoading indique si les données de l'utilisateur sont en cours de chargement
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) { // Redirection si l'utilisateur n'est pas connecté et le chargement est terminé
      navigate("/login");
    } else if (!isLoading && user && user.role !== "administrateur") { // Si l'utilisateur est chargé et n'est pas un administrateur
      navigate("/404");
    }
  }, [user, isLoading, navigate]);

  return !isLoading && user && user.role === "administrateur" ? children : <div>Chargement...</div>;
}

export default ProtectedRoutes;