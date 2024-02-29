import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

function VerificationPage() {
  const { token } = useParams(); // Avec React Router pour récupérer le token de l'URL
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/verify/${token}`)
      .then((response) => {
        setVerificationMessage(
          "Votre compte a été vérifié avec succès ! Vous pouvez maintenant vous connecter."
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification du compte", error);
        setVerificationMessage("Erreur lors de la vérification du compte.");
      });
  }, [token]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center mt-40 text-2xl">
        <p> {verificationMessage}</p>
      </div>
    </div>
  );
}

export default VerificationPage;
