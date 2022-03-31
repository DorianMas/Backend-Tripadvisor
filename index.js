const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

//package Mailgun-js  (on reseingne son API KEY + son DOMAIN et on importe le package)
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const app = express();
app.use(cors());
app.use(formidable());

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

//Cette route s'occupera de l'envoi du mail
app.post("/form", (req, res) => {
  //   Le console.log de req.fields nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :
  const firstname = req.fields.firstname;
  const lastname = req.fields.lastname;
  const email = req.fields.email;
  const message = req.fields.description;

  //   On crée un objet data qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
  const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "dorian.masquelier@gmail.com",
    subject: "Formulaire JS",
    text: `Message envoyé par ${firstname} ${lastname} : ${message}`,
  };

  //   Fonctions fournies par le package mailgun pour créer le mail et l'envoyer :
  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
    if (error === undefined) {
      // s'il n'y a pas eu d'erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res.status(200).json(body);
    } else {
      // s'il y a eu une erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :

      res.json(error);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
