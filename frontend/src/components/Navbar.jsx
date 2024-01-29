import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import s from "../styles/Navbar.module.scss";

function Navbar() {
  return (
    <nav className={s.nav}>
      <Link to="/">
        <img href="/" className={s.imgLogo} src={logo} alt="logo" />
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
