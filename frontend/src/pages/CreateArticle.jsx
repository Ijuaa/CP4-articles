/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import Navbar from "../components/Navbar";
import "../styles/createArticle.scss";
import "react-quill/dist/quill.snow.css";

import uploadImg from "../assets/uplo.svg";

function CreateArticle() {
  const [article, setArticle] = useState({
    titre: "",
    contenu: "",
    auteur: "",
    datePublication: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setArticle({ ...article, [e.target.name]: e.target.files[0] });
    } else {
      setArticle({ ...article, [e.target.name]: e.target.value });
    }
  };

  const handleQuillChange = (content) => {
    setArticle({ ...article, contenu: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in article) {
      if (Object.prototype.hasOwnProperty.call(article, key)) {
        formData.append(key, article[key]);
      }
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/articles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 mt-6 text-center">
        Créer un nouvel article
      </h1>
      <div className="formWrapper max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:grid md:grid-cols-3 gap-4"
        >
          <div className="md:col-span-1 flex flex-col">
            <input
              className="border p-2 radius-2 rounded-md mb-4"
              type="text"
              name="titre"
              placeholder="Titre"
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded-md mb-4"
              type="text"
              name="auteur"
              placeholder="Auteur"
              onChange={handleChange}
            />
            <div className="flex items-center justify-center gap-14">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="image"
                  className="label-img mb-2 font-semibold mt-8 w-16"
                >
                  <img src={uploadImg} alt="" />
                </label>
                <input
                  id="image"
                  className="border p-1 rounded-md"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  hidden
                />
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col mr-4">
                  <label htmlFor="categorie" className="mb-2 font-semibold">
                    Catégorie
                  </label>
                  <select
                    name="categorie"
                    className="border p-2 font-semibold rounded-md"
                    onChange={handleChange}
                  >
                    <option value="JV">Jeux vidéo</option>
                    <option value="Tech">Tech</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="textArea col-span-2">
            <ReactQuill
              className="quill h-full"
              value={article.contenu}
              onChange={handleQuillChange}
              theme="snow"
            />
          </div>
          <button
            className="button-envoyer mt-8 bg-blue-500 text-white p-2 rounded-md col-span-3 w-96"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateArticle;
