const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "articles" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * from ${this.table}`);
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * from ${this.table} WHERE id = ?`,
      [id]
    );
    return result[0];
  }

  async create(article) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (titre, contenu, auteur, categorie, image_url) VALUES (?, ?, ?, ?, ?)`,
      [
        article.titre,
        article.contenu,
        article.auteur,
        article.categorie,
        article.image_url,
      ]
    );
    return result.insertId;
  }

  async lastFive() {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY date_publication DESC LIMIT 5`
    );
    return result;
  }
}

module.exports = ArticlesManager;
