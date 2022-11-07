const router = require("express").Router();
const { createUser } = require("../controllers/user");
const { getAdmin, deleteAdmin } = require("../controllers/admin");

router.route("/api/v1/user").post(createUser).delete(deleteAdmin);
router.route("/api/v1/login/admin/:email/:password").get(getAdmin);

module.exports = router;
