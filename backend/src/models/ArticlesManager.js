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

  async create(article) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (titre, contenu, auteur_id, image_url) VALUES (?, ?, ?, ?)`,
      [article.titre, article.contenu, article.auteur_id, article.image_url]
    );
    return result.insertId;
  }

  async readAllWithAuthor() {
    const [result] = await this.database.query(
      `Select articles.*, utilisateurs.pseudo AS auteur_pseudo 
      FROM ${this.table} 
      JOIN utilisateurs ON articles.auteur_id = utilisateurs.id 
      order by articles.date_publication DESC`
    );
    return result;
  }

  async lastFiveWithAuthor() {
    const [result] = await this.database.query(
      `Select articles.*, utilisateurs.pseudo AS auteur_pseudo 
      FROM ${this.table} JOIN utilisateurs ON articles.auteur_id = utilisateurs.id 
      order by articles.date_publication DESC LIMIT 5`
    );
    return result;
  }

  async readWithAuthor(id) {
    const [result] = await this.database.query(
      `SELECT articles.*, utilisateurs.pseudo AS auteur_pseudo 
       FROM ${this.table} 
       JOIN utilisateurs ON articles.auteur_id = utilisateurs.id 
       WHERE articles.id = ?`,
      [id]
    );
    return result.length ? result[0] : null;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * from ${this.table} WHERE id = ?`,
      [id]
    );
    return result[0];
  }

  async lastFive() {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY date_publication DESC LIMIT 5`
    );
    return result;
  }
}

module.exports = ArticlesManager;
