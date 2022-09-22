const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = { userModel };
