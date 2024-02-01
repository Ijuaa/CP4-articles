/* eslint-disable camelcase */
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const allArticles = await tables.articles.readAll();
    res.json(allArticles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await tables.articles.read(id);
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const auteur_id = req.user.id;
  const article = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    auteur_id,
    image_url: req.file ? `/uploads/${req.file.filename}` : "",
  };
  try {
    const insertId = await tables.articles.create(article);
    res.status(201).json({ insertId, imageUrl: article.image_url });
  } catch (err) {
    next(err);
  }
};

const browseLastFiveWithAuthor = async (req, res, next) => {
  try {
    const lastFiveArticleswithAuthor =
      await tables.articles.lastFiveWithAuthor();
    res.json(lastFiveArticleswithAuthor);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  browseLastFiveWithAuthor,
};
