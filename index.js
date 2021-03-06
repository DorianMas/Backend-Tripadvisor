const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

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
