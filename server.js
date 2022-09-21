const express = require("express");
const { router } = require("./routes/router");

const app = express();
app.use("/ecommerce/", router);

app.listen(5000, () => {
  console.log("Ecommerce API Launched...");
});
