import { useState } from "react";
import { Link } from "react-router-dom"; // Assurez-vous que react-router-dom est installé
import axios from "axios";

function Login() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "pseudo") setPseudo(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "confirmPassword") setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//penser a ajouter toastify 
    if (password !== confirmPassword) {
      console.alert("Les mots de passe ne correspondent pas."); //penser a ajouter toastify 
      return;
    }
//penser a ajouter toastify 
    try {
      const response = await axios.post("/api/login", { pseudo, password });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.info(`Échec de la connexion: ${error.response.data.message}`);
    }
  };

  return (
    <div>
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
