/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { toast, ToastContainer } from "react-toastify";

function AdminArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/articles/${articleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article", error);
        toast.error("Erreur lors de la récupération de l'article");
      }
    };

    fetchArticle();
  }, [articleId]);

  const approveArticle = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/articles/${articleId}/approve`,
        {}, // On envoie un objet vide car on a pas besoin de données pour cette requête
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Article approuvé avec succès !");
      navigate("/admin"); // Redirige vers la page d'administration apèrs avoir approuvé l'article. !attention à bien importer useNavigate et pas Navigate
    } catch (error) {
      console.error("Erreur lors de l'approbation de l'article", error);
      toast.error("Erreur lors de l'approbation de l'article");
    }
  };

  const deleteArticle = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/articles/${articleId}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Article supprimé avec succès !");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article", error);
      toast.error("Erreur lors de la suppression de l'article");
    }
  };

  if (!article) return <div>Chargement en cours...</div>;

  return (
    <div className="container mx-auto p-4 max-w-[1400px]">
      <ToastContainer />
      {article.image_url && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${article.image_url}`}
          alt={article.titre}
          className="w-full h-auto md:h-[600px] object-cover mb-4 rounded-lg"
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-4">
        <h1 className="text-3xl font-bold">{article.titre}</h1>
        <p className="text-sm text-gray-600">Par : {article.auteur_pseudo}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.contenu),
        }}
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={approveArticle}
          className="mt-4  bg-slate-500 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded"
        >
          Approuver cet article
        </button>
        <button
          type="button"
          onClick={deleteArticle}
          className="mt-4 ml-2 bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
        >
          Supprimer cet article
        </button>
      </div>
    </div>
  );
}

export default AdminArticleDetail;
