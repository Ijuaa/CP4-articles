import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.scss";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/">
        <img href="/" className="imgLogo" src={logo} alt="logo" />
      </Link>
      <ul>
        <li>
          <a href="/create">Create</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
