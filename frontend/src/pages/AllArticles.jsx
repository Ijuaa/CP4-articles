import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/allArticles.scss";

function allArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/articles`
        );
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto max-w-[1400px] pt-4 px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="article-card overflow-hidden shadow-lg rounded-lg"
          >
            {article.image_url && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${article.image_url}`}
                alt={article.titre}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="article-title min-h-[99px] text-xl font-semibold">
                {article.titre}
              </h2>
            </div>
            <div className="divPseudo px-4 pb-4 text-right">
              <span className="allArticlepseudo text-sm text-gray-600">
                Par : {article.auteur_pseudo}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default allArticles;
