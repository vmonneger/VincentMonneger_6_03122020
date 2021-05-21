const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');

const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");

const app = express();

// app.use(helmet());

mongoose.connect("mongodb+srv://Vincent:mdp@peko.mtxp6.mongodb.net/peko?retryWrites=true&w=majority",
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;