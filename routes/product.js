const {
  getProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getSearchProducts,
} = require("../controllers/product");

const Router = require("express").Router();

Router.route("/api/v1/search/:keyword").get(getSearchProducts);
Router.route("/api/v1/allproducts").get(getAllProducts);
Router.route("/api/v1/:product").get(getProduct).delete(deleteProduct);
Router.route("/api/v1/product").post(createProduct);

module.exports = Router;
