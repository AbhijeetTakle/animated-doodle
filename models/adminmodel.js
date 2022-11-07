const mongoose = require("mongoose");
const { productSchema } = require("./productmodel");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  address: { type: String },
  phone: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  catalog: [productSchema],
});

const adminModel = mongoose.model("Admins", adminSchema);

module.exports = adminModel;
