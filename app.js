require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const transactionsRoutes = require("./routes/transactions");
const walletRoutes = require("./routes/wallet");
let models = require('./config/modelAccess');

//Allows global access to models
app.models = models;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//To avoid CORS error while api calling

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/", transactionsRoutes);
app.use("/", walletRoutes);




module.exports = app;