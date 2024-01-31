const jwt = require("jsonwebtoken");
const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const users = await tables.utilisateurs.readAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await tables.utilisateurs.read(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

const add = async (req, res) => {
  const user = req.body;

  try {
    const insertId = await tables.utilisateurs.create(user);
    res.status(201).json({ insertId });
  } catch (error) {
    console.error(error);
  }
};

const userPseudoFinder = async (req, res) => {
  const { pseudo } = req.params;
  try {
    const userId = await tables.utilisateurs.findUserByPseudo(pseudo);
    if (userId === null) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }
    return res.status(200).json({ userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { pseudo, password } = req.body;
  const user = await tables.utilisateurs.validatelogin(pseudo, password);
  if (user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ accessToken });
  }
};
module.exports = {
  browse,
  read,
  add,
  userPseudoFinder,
  userLogin,
};
