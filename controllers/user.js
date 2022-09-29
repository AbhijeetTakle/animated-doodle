const bcrypt = require("bcrypt");
const userModel = require("../models/usersmodel");
const mongoose = require("mongoose");

const createUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const address = req.body.address;
  const admin = req.body.admin;

  (async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    var newuser = new userModel({
      _id: mongoose.Types.ObjectId(),
      username: username,
      password: hash,
      email: email,
      address: address,
      admin: admin,
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

module.exports = createUser;
