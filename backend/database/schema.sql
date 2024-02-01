
create table utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('utilisateur', 'administrateur') DEFAULT 'utilisateur'
);
create table articles (
  id INT auto_increment primary key,
  titre varchar(255) not null,
  contenu MEDIUMTEXT not null,
  date_publication datetime DEFAULT CURRENT_TIMESTAMP,
  image_url VARCHAR(255),
  auteur_id INT,
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id));

create table commentaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contenu TEXT NOT NULL,
  date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
  auteur_id INT,
  article_id INT,
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);

create table votes (
  article_id INT,
  utilisateur_id INT,
  type ENUM('like', 'dislike'),
  UNIQUE KEY unique_vote (article_id, utilisateur_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);
