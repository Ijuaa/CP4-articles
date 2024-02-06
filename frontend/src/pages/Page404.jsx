import { Link } from "react-router-dom";
import encre404 from "../assets/encre404.webp";
import "../styles/page404.scss";

export default function Page404() {
  return (
    <div className="container404 flex justify-center flex-col items-center h-screen">
      <h1 className="text-center text-5xl">Perdu? En manque d'inspiration?</h1>
      <Link to="/">
        <img className="img404 w-[35rem] pr-12 pt-4" src={encre404} alt="404" />
      </Link>
      <h2 className="text-center text-3xl">
        Pas de panique, on vous ramène à la maison
      </h2>
      <p className="text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Retour à l'accueil
        </Link>
      </p>
    </div>
  );
}
