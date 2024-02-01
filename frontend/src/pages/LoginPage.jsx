import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assurez-vous que react-router-dom est installé
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "pseudo") setPseudo(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "confirmPassword") setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { pseudo, password }
      );
      const { accessToken } = response.data;
      login(accessToken);
      toast.success("Connexion réussie");
      navigate("/");
    } catch (error) {
      toast.error(
        `Échec de la connexion: ${
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        }`
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pseudo"
          value={pseudo}
          onChange={handleChange}
          placeholder="Pseudo"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Mot de passe"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirmer le mot de passe"
        />
        <button type="submit">Connexion</button>
      </form>
      <p>
        Vous n'avez pas de compte ? <Link to="/signup">Créer un compte</Link>
      </p>
    </div>
  );
}

export default Login;
