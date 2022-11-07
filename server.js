const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./connectdb");
const userAPI = require("./routes/user");
const adminAPI = require("./routes/admin");
const productAPI = require("./routes/product");
const bodyParser = require("body-parser");
const { getAllProducts } = require("./controllers/product");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectdb();

app.use("/ecommerce", userAPI);
app.use("/ecommerce", adminAPI);
app.use("/ecommerce", productAPI);

app.listen(process.env.PORT, () => {
  console.log("Ecommerce API Launched...");
});
