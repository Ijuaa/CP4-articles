### Scriba: Une Plateforme de Partage d'Articles
Bienvenue sur le repository de Scriba, une plateforme conçue pour partager vos pensées, découvertes et créations avec le monde. Scriba est né de l'envie de fournir un espace où chacun peut exprimer sa créativité et partager ses connaissances à travers des articles variés.

### 🚀 Fonctionnalités
Scriba offre une multitude de fonctionnalités pour enrichir l'expérience utilisateur :

Publication d'articles : Les utilisateurs peuvent créer et publier leurs propres articles, en y ajoutant des images pour illustrer leurs propos.
Modération par les administrateurs : Les articles soumis sont d'abord soumis à une approbation par un administrateur pour maintenir une qualité et une cohérence des publications.
Consultation d'articles : Tous les visiteurs ont accès à la lecture des articles approuvés et peuvent les découvrir librement.
Gestion de compte : Inscription et connexion pour une expérience personnalisée et sécurisée.
🛠 Installation
Pour installer et exécuter Scriba localement, suivez ces étapes :

Clonez ce repository sur votre machine locale.
Installez les dépendances en exécutant npm install dans le répertoire du projet.
Lancez l'application avec npm start. L'application sera accessible à l'adresse http://localhost:3000.

### 📦 Endpoints API
Scriba offre une API RESTful pour gérer les articles, les utilisateurs et les sessions. Voici quelques-uns des principaux endpoints :

--- Articles :
- GET /articles : Récupère tous les articles approuvés.
- POST /articles : Soumet un nouvel article (nécessite une authentification).
- GET /articles/:id : Récupère un article spécifique par son ID.

--- Utilisateurs :
- POST /users : Crée un nouvel utilisateur (inscription).
- POST /login : Authentifie un utilisateur.

--- Administration :
- GET /admin/articles : Liste tous les articles en attente d'approbation (nécessite un rôle d'administrateur).
- PATCH /admin/articles/:id/approve : Approuve un article spécifique (nécessite un rôle d'administrateur).

### 🛡 Sécurité
La sécurité est une priorité pour Scriba. Nous utilisons JWT pour l'authentification et veillons à protéger les données de nos utilisateurs.

### 💡 Contribuer
Votre contribution est la bienvenue ! N'hésitez pas à proposer des pull requests ou à ouvrir des issues pour suggérer des améliorations ou signaler des bugs.

### 📝 Licence
Ce projet est sous licence MIT. Voir le fichier LICENCE pour plus de détails.