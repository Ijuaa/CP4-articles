/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

function oneArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/articles/${articleId}`
        );
        setArticle(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) return <div>Petit problème</div>; //Tout casse si je retire ça

  return (
    <div className="container mx-auto p-4 max-w-[1400px] px-0">
      {article.image_url && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${article.image_url}`}
          alt={article.titre}
          className="w-full h-auto md:h-[600px] object-cover mb-4 rounded-lg"
        />
      )}
      <div className="flex flex-col md:flex-row justify-center items-baseline mb-16 mt-10">
        <h1 className="text-3xl font-bold  md:text-6xl ">{article.titre}</h1>
        <span className="text-md text-gray-600 mt-2 md:mt-0 ml-3">
          Par : {article.auteur_pseudo}
        </span>
      </div>
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.contenu),
        }}
       />
    </div>
  );
}

export default oneArticle;
