const { productModel } = require("../models/productmodel");
const mongoose = require("mongoose");
const { updateAdmin } = require("./admin");
const { userModel } = require("../models/usersmodel");

const getProduct = async (req, res) => {
  req.params.product = mongoose.Types.ObjectId(req.params.product);
  const productRequired = await productModel.findById(req.params.product);
  res.json(productRequired);
};

const createProduct = async (req, res) => {
  const productname = req.body.productname;
  const productprice = req.body.productprice;
  const reviews = req.body.reviews;
  const productowner = req.body.productowner;
  const productdescription = req.body.productdescription;
  const productspecs = req.body.productspecs;
  const category = req.body.category;
  const productimages = req.body.productimages;

  await (async () => {
    var newproduct = new productModel({
      _id: mongoose.Types.ObjectId(),
      productname,
      productprice,
      reviews,
      productowner,
      productdescription,
      productspecs,
      productimages,
      category,
    });

    newproduct
      .save()
      .then((doc) => {
        return res.status(201).json({
          message: "product successfully added to your catalog",
          record: doc,
        });
      })
      .catch((err) => {
        return res.json({
          message: err,
          record: {},
        });
      });
    updateAdmin(newproduct);
  })();
};

const deleteProduct = async (req, res) => {
  req.params.product = mongoose.Types.ObjectId(req.params.product);
  const product = productModel.deleteOne({ _id: req.params.product });
  res.json({ message: "product deleted from catalog" });
};

const getAllProducts = async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
};

const getSearchProducts = async (req, res) => {
  const key = req.params.keyword;
  const products = await productModel.find({
    productname: { $regex: ".*" + key + ".*", $options: "i" },
  });
  if (products.length == 0) {
    res.json({ success: false, message: "No Results Found." });
  } else {
    res.json({ success: true, message: "Found Results..", products: products });
  }
};

module.exports = {
  getProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getSearchProducts,
};
