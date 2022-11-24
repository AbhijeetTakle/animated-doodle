const mongoose = require("mongoose");
const { productSchema } = require("./productmodel");
const { userSchema } = require("./usersmodel");

const ordersSchema = new mongoose.Schema({
  product: productSchema,
  user: userSchema,
  shipped: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  isadmin: { type: Boolean, default: true },
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
  orders: [ordersSchema],
});

const adminModel = mongoose.model("Admins", adminSchema);

module.exports = adminModel;
