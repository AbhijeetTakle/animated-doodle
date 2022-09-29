const express = require("express");
const { router } = require("./routes/router");
const mongoose = require("mongoose");
const { userModel } = require("./models/usersmodel");
const cors = require("cors");
const app = express();
const connectdb = require("./connectdb");
const dotenv = require("dotenv").config();
const userAPI = require("./routes/user");

app.use(cors());

connectdb();

app.use("/ecommerce/", router);
app.use("/ecommerce", userAPI);

app.listen(process.env.PORT, () => {
  console.log("Ecommerce API Launched...");
});
