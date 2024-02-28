const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const transporter = require("../services/email");
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
    const verificationToken = uuidv4();

    await tables.utilisateurs.saveVerificationToken(
      insertId,
      verificationToken
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Vérification de votre compte Scriba",
      html: `<p>Cliquez sur ce lien pour vérifier votre compte:</p> <a href="${process.env.FRONTEND_URL}/verify/${verificationToken}">Vérifier mon compte</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'envoi de l'email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({
          message: "Utilisateur créé et email de vérification envoyé",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
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
    const tokenPayload = {
      id: user.id,
      pseudo: user.pseudo,
      role: user.role,
    };
    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ accessToken });
  }
  return res.status(401).json({ erreur: "Mauvais pseudo ou mot de passe" });
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    // pour chhercher l'utilisateur par le token de vérification
    const userId = await tables.utilisateurs.findUserByVerificationToken(token);
    if (!userId) {
      return res.status(404).send("Token invalide ou expiré.");
    }

    // pour amrquer l'utilisateur comme vérifié
    await tables.utilisateurs.markEmailAsVerified(userId);

    res.send("Compte vérifié avec succès !");
  } catch (error) {
    console.error(`Erreur lors de la vérification : ${error}`);
    res.status(500).send("Erreur lors de la vérification.");
  }
};

module.exports = {
  browse,
  read,
  add,
  userPseudoFinder,
  userLogin,
  verifyEmail,
};
