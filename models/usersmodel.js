const mongoose = require("mongoose");
const { productSchema } = require("./productmodel");

const cartSchema = new mongoose.Schema({
  cartproduct: productSchema,
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
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
  cart: [cartSchema],
});

const userModel = mongoose.model("Users", userSchema);

module.exports = { userModel, userSchema };
