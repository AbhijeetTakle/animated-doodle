const mongoose = require("mongoose");

const connectdb = (url, connectionParams) => {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};

module.exports = connectdb;
