import adventurers404 from "../assets/adventurers404.png";
import "../styles/page404.scss";
export default function page404() {
  return (
    <div className="container404 flex justify-center items-center h-screen">
      <img className="img404 w-1/3" src={adventurers404} alt="404" />
    </div>
  );
}
