const mongoose = require("mongoose");

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
  address: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  admin: { type: Boolean, required: true },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
