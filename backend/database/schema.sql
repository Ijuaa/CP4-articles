create table articles (
  id INT auto_increment primary key,
  titre varchar(255) not null,
  contenu MEDIUMTEXT not null,
  auteur varchar(255) not null,
  date_publication datetime DEFAULT CURRENT_TIMESTAMP,
  categorie VARCHAR(255),
  image_url VARCHAR(255)
);
