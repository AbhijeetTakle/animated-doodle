const adminModel = require("../models/adminmodel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { productModel } = require("../models/productmodel");
const { userModel } = require("../models/usersmodel");

const deleteAdmin = async (req, res) => {
  const email = req.body.email;
  await adminModel
    .deleteOne({
      email: email,
    })
    .then((response) => {
      res.status(201).json({
        message: response,
      });
    })
    .catch((err) => {
      return res.json({
        message: err,
        record: {},
      });
    });
};

const getAdmin = async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const user = await adminModel.findOne({
    email: email,
  });
  if (user !== null) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      res.status(201).json({
        message: "sccessfully LoggedIn",
        result: user,
      });
    } else {
      res.json({
        message: "Wrong Username or password",
      });
    }
  } else {
    res.json({
      message: "User Not Registered",
    });
  }
};

const updateAdmin = async (req, res) => {
  const productowner = req.params.product.productowner;
  const admin = await adminModel.findOne({ _id: productowner });
  let catalog = admin.catalog;
  catalog.push(product);
  await adminModel.findOneAndUpdate(
    { _id: productowner },
    { catalog: catalog }
  );
  res.json({ message: "product added to catalog" });
};

module.exports = { deleteAdmin, getAdmin, updateAdmin };
