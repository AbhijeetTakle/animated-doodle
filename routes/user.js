const router = require("express").Router();
const createUser = require("../controllers/user");

router.route("api/v1/signup").post(createUser);

module.exports = router;
