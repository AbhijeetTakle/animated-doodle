const router = require("express").Router();
const {
  createUser,
  deleteUser,
  getUser,
  addToCart,
} = require("../controllers/user");

router.route("/api/v1/user").post(createUser).delete(deleteUser);
router.route("/api/v1/login/:email/:password").get(getUser);
router.route("/api/v1/addtocart/:user/:product").post(addToCart);
module.exports = router;
