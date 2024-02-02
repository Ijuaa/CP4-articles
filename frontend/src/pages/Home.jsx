/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import "../styles/home.scss"; // Vérifiez le chemin vers votre fichier SCSS

function Home() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [expandedArticleId, setExpandedArticleId] = useState(null); // Stocke l'ID de l'article étendu

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/articles-home`
        );
        setLatestArticles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles", error);
      }
    };

    fetchArticles();
  }, []);

  // Bascule entre l'état étendu/réduit pour un article
  const toggleArticle = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  const formatDate = (date) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  return (
    <div className="divSa">
      <div className="home-wrapper flex justify-center mx-auto md:w-[1400px]">
        <ul>
          <p className="pt-2 pb-0 mb-0 text-xs">Nos 5 derniers articles :</p>
          {latestArticles.map((article) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={article.id}
              className={`uniArticle ${
                expandedArticleId === article.id ? "expanded" : ""
              }`}
              onClick={() => toggleArticle(article.id)}
            >
              <div className="frame-article flex flex-col md:flex-row items-center md:items-start ">
                <img
                  className="imgArt w-96 mr-10"
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    article.image_url
                  }`}
                  alt={article.titre}
                />
                <div
                  className={`text-center md:text-left mt-4 md:mt-0 md:max-w-[80%] ${
                    expandedArticleId === article.id ? "expanded" : ""
                  }`}
                >
                  <h2 className="font-extrabold text-2xl mb-4 pl-10 pt-8 underline">
                    {article.titre}
                  </h2>
                  <p className="mb-2 ml-8">Par : {article.auteur_pseudo}</p>
                  <div
                    className="contenu-wrapper overflow-auto p-8"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.contenu),
                    }}
                  />
                  <p className="flex mr-5 mb-2 md:flex-row-reverse justify-center md:justify-start">
                    {formatDate(article.date_publication)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
