const router = require("express").Router();
const { createUser, deleteUser, getUser } = require("../controllers/user");

router.route("/api/v1/user").post(createUser).delete(deleteUser).get(getUser);

module.exports = router;
