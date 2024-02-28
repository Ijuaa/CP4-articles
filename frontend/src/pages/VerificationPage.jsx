import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerificationPage() {
  const { token } = useParams(); // Avec React Router pour récupérer le token de l'URL
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/verify/${token}`)
      .then((response) => {
        // Mettre à jour l'état avec le message de succès
        setVerificationMessage("Votre compte a été vérifié avec succès !");
      })
      .catch((error) => {
        // Mettre à jour l'état avec le message d'erreur
        console.error("Erreur lors de la vérification du compte", error);
        setVerificationMessage("Erreur lors de la vérification du compte.");
      });
  }, [token]); // Ajouter token comme dépendance pour useEffect

  return (
    <div>
      <h1>Verification Page</h1>
      <p>{verificationMessage}</p>
    </div>
  );
}

export default VerificationPage;
