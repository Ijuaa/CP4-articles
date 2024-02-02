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
    <div className="mt-20 flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="pseudo"
            >
              Pseudo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pseudo"
              type="text"
              placeholder="Pseudo"
              name="pseudo"
              value={pseudo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmer le mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="********"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center flex-col">
            <button
              className=" hover:bg-slate-800 hover:text-slate-100 font-bold py-2 px-2 text-lg rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Connexion
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-gray-800 hover:text-slate-800"
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
