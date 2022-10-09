const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "userModel", required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String, required: true },
});

const productSpecs = new mongoose.Schema({
  dimensions: {
    height: { type: Number },
    length: { type: Number },
    breadth: { type: Number },
  },
  weight: { type: Number },
  brand: { type: String },
  material: { type: String },
  includedcomponents: { type: String },
  manufacturer: { type: String },
  countryoforigin: { type: String },
  modelname: { type: String },
  color: { type: String },
});

const images = new mongoose.Schema({
  imageurl: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  productprice: { type: String, required: true },
  reviews: [reviewSchema],
  productowner: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  productdescription: { type: String, required: true },
  productspecs: productSpecs,
  productimages: [images],
  category: { type: String },
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
