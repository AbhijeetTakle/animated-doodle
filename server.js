const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./connectdb");
const userAPI = require("./routes/user");
const productAPI = require("./routes/product");
const bodyParser = require("body-parser");
const { getAllProducts } = require("./controllers/product");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectdb();

// app.use("/ecommerce/", router);
app.use("/ecommerce", userAPI);
app.use("/ecommerce", productAPI);
app.get("/ecommerce/api/v1/allproducts", getAllProducts);

app.listen(process.env.PORT, () => {
  console.log("Ecommerce API Launched...");
});
