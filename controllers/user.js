const { userModel } = require("../models/usersmodel");
const adminModel = require("../models/adminmodel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { productModel } = require("../models/productmodel");

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const address = req.body.address;
  const admin = req.body.admin;
  const phone = req.body.phone;

  await (async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (admin) {
      var newuser = new adminModel({
        _id: mongoose.Types.ObjectId(),
        username,
        password: hash,
        email,
        phone,
        address,
      });
    } else {
      var newuser = new userModel({
        _id: mongoose.Types.ObjectId(),
        username,
        password: hash,
        email,
        phone,
        address,
      });
    }

    newuser
      .save()
      .then((doc) => {
        return res.status(201).json({
          message: "user registered Successfully",
          record: doc,
        });
      })
      .catch((err) => {
        return res.json({
          message: err,
          record: {},
        });
      });
  })();
};

const deleteUser = async (req, res) => {
  const email = req.body.email;
  await userModel
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

const getUser = async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const user = await userModel
    .findOne({
      email: email,
    })
    .populate({ path: "cart", select: ["cartproduct"] });
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

const addToCart = async (req, res) => {
  let user = req.params.user;
  let productid = req.params.product;
  user = await userModel.findOne({ _id: user });
  const product = await productModel.findOne({ _id: productid });
  const idx = user.cart.findIndex((item) => {
    return item.cartproduct._id.toString() === productid;
  });
  if (idx === -1) {
    user.cart.push({ cartproduct: product, quantity: 1 });
    await userModel.updateOne({ _id: user._id }, user);
    res.json({ message: "add to cart is success." });
  } else {
    res.json({ message: "product already in cart." });
  }
};

const deleteFromCart = async (req, res) => {
  let user = req.params.user;
  let product = req.params.product;

  user = await userModel.findOne({ _id: user });
  const idx = user.cart.findIndex((item) => {
    return item.cartproduct._id.toString() === product;
  });
  if (idx === -1) {
    res.json({ message: "product not in cart" });
  } else {
    user.cart.splice(idx, 1);
    await userModel.updateOne({ _id: user._id }, user);
    res.json({ message: "remove from cart is success." });
  }
};

const addOrder = async (req, res) => {
  const productownerid = req.params.productowner;
  const productid = req.params.product;
  const userid = req.params.user;
  const productowner = await adminModel.findOne({ _id: productownerid });
  const user = await userModel.findOne({ _id: userid });
  const idx = user.cart.findIndex((item) => {
    return item.cartproduct._id.toString() === productid;
  });
  if (idx !== -1) {
    user.cart.splice(idx, 1);
    await userModel.updateOne({ _id: user._id }, { cart: user.cart });
  }
  const product = await productModel.findOne({ _id: productid });
  productowner.orders.push({ user: user, product: product });
  await adminModel.findOneAndUpdate(
    { _id: productownerid },
    { orders: productowner.orders }
  );
  res.json({ message: "order placed for the item" });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  addToCart,
  deleteFromCart,
  addOrder,
};
