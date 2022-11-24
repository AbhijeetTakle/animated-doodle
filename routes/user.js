const router = require("express").Router();
const {
  createUser,
  deleteUser,
  getUser,
  addToCart,
  deleteFromCart,
  addOrder,
} = require("../controllers/user");

router.route("/api/v1/user").post(createUser).delete(deleteUser);
router.route("/api/v1/login/:email/:password").get(getUser);
router
  .route("/api/v1/addtocart/:user/:product")
  .post(addToCart)
  .delete(deleteFromCart);
router.route("/api/v1/placeorder/:user/:productowner/:product").post(addOrder);
module.exports = router;
