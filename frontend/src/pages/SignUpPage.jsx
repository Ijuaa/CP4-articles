import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pseudo || !email || !password || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          pseudo,
          email,
          password,
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Inscription réussie, Merci de vérifier votre email pour activer votre compte.",
          {
            autoClose: 5000,
            onClose: () => navigate("/login", { replace: true }),
          }
        );
      } else {
        throw new Error("Échec de la création de l'utilisateur");
      }
    } catch (error) {
      toast.error(
        `Erreur lors de l'inscription: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-center">Inscription</h2>
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
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="Confirmer le mot de passe"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            <button
              className="hover:bg-slate-800 hover:text-slate-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              S'inscrire
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-gray-800 hover:text-slate-800 mt-4"
            >
              Connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
