const router = require("express").Router();
const mongoose = require("mongoose");
const { userModel } = require("../models/usersmodel");

router.route("/api/v1/allusers").get(async (req, res) => {
  const allusers = await userModel.find();
  res.json(allusers);
});

router
  .route("/api/v1/user")
  .post(async (req, res) => {
    const response = await userModel.create({
      name: "prakhar singh rajput",
      address: "pune",
      phone: "4521635492",
      admin: false,
    });
    if (response) {
      res.json({ status: 200 });
    } else {
      res.json({ status: 404 });
    }
  })
  .get(async (req, res) => {
    const response = await userModel.find({
      name: "Omkar nana Takle",
    });
    res.json(response);
  })
  .delete(async (req, res) => {
    const response = await userModel.deleteOne({
      name: "Omkar nana Takle",
    });
    res.json(response);
  })
  .patch(async (req, res) => {
    const response = await userModel.updateOne(
      {
        name: "prakhar singh rajput",
      },
      {
        address: "kothrud",
      }
    );
    res.json(response);
  });

module.exports = { router };
