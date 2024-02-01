/* eslint-disable react/no-danger */
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
    <div className="divSa">
      <div className="home-wrapper flex justify-center mx-auto md:w-[1400px]">
        <ul>
          {latestArticles.map((article) => (
            <li key={article.id} className="uniArticle mt-5">
              <div className="frame-article flex flex-col md:flex-row items-center md:items-start ">
                <img
                  className="imgArt w-96 md:mr-10"
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    article.image_url
                  }`}
                  alt={article.titre}
                />
                <div className="text-center md:text-left mt-4 md:mt-0 md:max-w-[80%]">
                  <h2 className="font-extrabold text-2xl mb-4 pl-10 pt-8 underline">
                    {article.titre}
                  </h2>
                  <div
                    className="contenu-wrapper overflow-auto p-8"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.contenu),
                    }}
                  />
                  <p>{article.auteur}</p>
                  <p className="flex mr-5 mb-2 md:flex-row-reverse justify-center md:justify-start">
                    {formatDate(`${article.date_publication}`)}
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
