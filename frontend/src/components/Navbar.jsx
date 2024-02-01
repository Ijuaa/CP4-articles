import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import plume from "../assets/plume.png";

import "../styles/Navbar.scss";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="nav bg-[#100b1a] text-white flex justify-between items-center p-4 md:w-[1400px] mx-auto">
        <div className="flex items-center justify-start flex-grow">
          <Link to="/">
            <img className="imgLogo" src={logo} alt="logo" />
          </Link>
        </div>
        <h1 className="titre-site text-3xl text-center mx-auto">
          Mon super site
        </h1>
        <div className="flex items-center justify-end flex-grow">
          <ul className="flex items-center justify-end">
            {user && (
              <li className="">
                <div className="pr-20">
                  <Link to="/create">
                    <img
                      className="plume w-32"
                      src={plume}
                      alt="Ecrire un nouvel article"
                    />
                    <p className="pl-4 text-s">Nouvel article</p>
                  </Link>
                </div>
              </li>
            )}
            {user ? (
              <div>
                <li className="">Bonjour {user.pseudo}</li>
                <li className="">
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
