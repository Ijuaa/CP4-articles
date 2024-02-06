import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/LogoTitre2resized.png";
import pPlume from "../assets/petitePlume.webp";

import "../styles/Navbar.scss";

function Navbar() {
  const { user, logout } = useAuth();
  console.log("User infoNav:", user);

  // Vérification si l'utilisateur est un administrateur
  const isAdmin = user && user.role === "administrateur";

  return (
    <div>
      <nav className="nav bg-[#100b1a] text-white flex justify-between items-center p-2 pr-4 md:w-[1400px] mx-auto">
        <div className="flex items-center justify-start flex-grow">
          <Link to="/">
            <img className="imgLogo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex items-center justify-end flex-grow">
          <ul className="flex items-center justify-end">
            <li className="pt-1">
              <Link to="/articles" className="pr-4">
                Tous les articles
              </Link>
            </li>
            {isAdmin && (
              <li className="pt-1 ">
                <Link to="/admin" className="pr-4">
                  Administration
                </Link>
              </li>
            )}
            {user && (
              <li className="mr-8 pl-4 border-l-2 pr-4 border-r-2">
                <Link to="/create" className="flex items-center">
                  <img
                    className="w-6 pb-6"
                    src={pPlume}
                    alt="Écrire un nouvel article"
                  />
                  <span className="text-s pl-2">Nouvel article</span>
                </Link>
              </li>
            )}
            {user ? (
              <div>
                <li>Bonjour {user.pseudo}</li>
                <li>
                  <button className="text-xs" type="button" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </div>
            ) : (
              <li className="p-4">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;