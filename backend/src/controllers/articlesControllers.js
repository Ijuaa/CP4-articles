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
  const article = req.body;
  if (req.file) {
    article.image_url = `/uploads/${req.file.filename}`;
  }
  try {
    const insertId = await tables.articles.create(article);
    res.status(201).json({ insertId, imageUrl: article.image_url });
  } catch (err) {
    next(err);
  }
};

const browseLastFive = async (req, res, next) => {
  try {
    const lastFiveArticles = await tables.articles.lastFive();
    res.json(lastFiveArticles);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  browseLastFive,
};
