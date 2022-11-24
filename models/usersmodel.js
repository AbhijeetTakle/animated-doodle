const mongoose = require("mongoose");
const { productSchema } = require("./productmodel");

const userSchema = new mongoose.Schema({
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
  cart: [productSchema],
});

const userModel = mongoose.model("Users", userSchema);

module.exports = { userModel, userSchema };
