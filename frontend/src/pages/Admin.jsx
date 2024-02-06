import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const [unapprovedArticles, setUnapprovedArticles] = useState([]);

  const fetchUnapprovedArticles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/articles`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUnapprovedArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles", error);
    }
  };

  useEffect(() => {
    fetchUnapprovedArticles();
  }, []);

  return (
    <div className="container mx-auto pt-4 px-4 max-w-[1400px]">
      <h1 className="text-2xl font-bold mb-6 underline">
        {unapprovedArticles.length} Articles en attente d'approbation
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {unapprovedArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Link to={`/admin/articles/${article.id}`}>
              {article.image_url && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    article.image_url
                  }`}
                  alt={article.titre}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{article.titre}</h2>
                <p className="text-right text-sm text-gray-600 mt-2">
                  Par : {article.auteur_pseudo}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
