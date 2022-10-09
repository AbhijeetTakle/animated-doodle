const userModel = require("../models/usersmodel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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
    var newuser = new userModel({
      _id: mongoose.Types.ObjectId(),
      username,
      password: hash,
      email,
      phone,
      address,
      admin,
    });

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
  const email = req.body.email;
  const password = req.body.password;
  const user = await userModel.findOne({
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
      res.status(404).json({
        message: "Wrong Username or password",
      });
    }
  } else {
    res.status(404).json({
      message: "User Not Registered",
    });
  }
};

module.exports = { createUser, deleteUser, getUser };