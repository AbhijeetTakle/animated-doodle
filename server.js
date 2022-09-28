const express = require("express");
const { router } = require("./routes/router");
const mongoose = require("mongoose");
const { userModel } = require("./models/usersmodel");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./connectdb");

app.use(cors());
dotenv.config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@ecomcluster.bwhyju4.mongodb.net/EcommerceDatabase?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
connectdb(url, connectionParams);

app.use("/ecommerce/", router);

app.listen(5000, () => {
  console.log("Ecommerce API Launched...");
});
