const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./connectdb");
const userAPI = require("./routes/user");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

connectdb();

// app.use("/ecommerce/", router);
app.use("/ecommerce", userAPI);

app.listen(process.env.PORT, () => {
  console.log("Ecommerce API Launched...");
});
