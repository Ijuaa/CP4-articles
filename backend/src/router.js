const express = require("express");

const router = express.Router();
/* const verifyAdmin = require("./middlewares/verifyAdmin"); */
const uploadFile = require("./middlewares/multer");
const jwtMiddleware = require("./middlewares/jwt");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
/* const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
 */
/* ************************************************************************* */

const articleControllers = require("./controllers/articlesControllers");

router.get("/articles", articleControllers.browseWithAuthors);
router.get("/articles/:id", articleControllers.readWithAuthor);
router.get("/articles-home", articleControllers.browseLastFiveWithAuthor);
router.post(
  "/articles",
  jwtMiddleware,
  uploadFile.single("image"),
  articleControllers.add
);

/* ************************************************************************* */

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/pseudo/:pseudo", userControllers.userPseudoFinder);
router.post("/users", userControllers.add);

router.post("/login", userControllers.userLogin);
/* ************************************************************************* */
/* router.get("/admin", verifyAdmin, */ // ????? plus tard

module.exports = router;
