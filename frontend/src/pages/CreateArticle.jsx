import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import s from "../styles/createArticle.module.scss";

function CreateArticle() {
  const [article, setArticle] = useState({
    titre: "",
    contenu: "",
    auteur: "",
    datePublication: "",
    categorie: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setArticle({ ...article, [e.target.name]: e.target.files[0] });
    } else {
      setArticle({ ...article, [e.target.name]: e.target.value });
    }
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
      <Navbar />
      <h1 className={s.titre}>Créer un nouvel article</h1>
      <div className={s.formWrapper}>
        <form action="">
          <input
            type="text"
            name="titre"
            id="titre"
            placeholder="Titre"
            onChange={handleChange}
          />
          <input
            type="text"
            name="auteur"
            id="auteur"
            placeholder="Auteur"
            onChange={handleChange}
          />
          <p>Catégorie</p>
          <select name="categorie" id="categorie" onChange={handleChange}>
            <option value="JV">Jeux vidéo</option>
            <option value="Tech">Tech</option>
          </select>
          <input
            className={s.fileInput}
            type="file"
            name="image"
            onChange={handleChange}
          />
          <textarea
            name="contenu"
            id="contenu"
            cols="139"
            rows="30"
            placeholder="Contenu de l'article"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateArticle;
