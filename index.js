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

//import de la route
const formulaireRoute = require("./formulaire");
app.use(formulaireRoute);

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
