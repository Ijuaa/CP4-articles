import { useState, useEffect } from "react";
import DOMPurify from "dompurify";

import Navbar from "../components/Navbar";
import backEnd from "../services/backEnd";
import "../styles/home.scss";

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

  const formatDate = (date) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  return (
    <div>
      <div className="home-wrapper container absolute ml-[15%]">
        <ul>
          {latestArticles.map((article) => (
            <div className="uniArticle mt-5">
              <li key={article.id}>
                <div className="frame-article flex justify-center items-center">
                  <img
                    className="w-96 h-1/3 mr-10 ml-6"
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      article.image_url
                    }`}
                    alt={article.titre}
                  />
                  <div className="max-w-[80%] mt-10 max-h-screen overflow-auto">
                    <div className="titre-wrapper flex justify-center mb-4 items-center">
                      <h2 className="font-extrabold text-xl w-80">
                        {article.titre}
                      </h2>
                    </div>
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(article.contenu),
                      }}
                    />
                  </div>
                </div>
                <p>{article.auteur}</p>
                <p>{formatDate(`${article.date_publication}`)}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
