import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backEnd from "../services/backEnd";
import s from "../styles/home.module.scss";

function Home() {
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    backEnd
      .get("/articles-home")
      .then((res) => {
        setLatestArticles(res.data);
      })
      .catch((err) => {
        console.error("erreur lors de la récupération des données", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={s.container}>
        <h1>Home</h1>
        <ul>
          {latestArticles.map((article) => (
            <li key={article.id}>
              <h2>{article.titre}</h2>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${article.image_url}`}
                alt={article.titre}
              />
              <p>{article.contenu}</p>
              <p>{article.auteur}</p>
              <p>{article.date_publication}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
