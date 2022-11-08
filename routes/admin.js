const router = require("express").Router();
const { getAdmin, deleteAdmin } = require("../controllers/admin");

router.route("/api/v1/admin").delete(deleteAdmin);
router.route("/api/v1/login/admin/:email/:password").get(getAdmin);

module.exports = router;
