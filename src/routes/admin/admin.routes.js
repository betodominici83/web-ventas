const router = require("express").Router();
const auth = require("../../middlewares/auth");
const requireRole = require("../../middlewares/requireRole");
const adminController = require("../../controllers/admin/admin.controller");

// Solo admin
router.post("/make-admin", auth, requireRole("admin"), adminController.makeAdmin);

module.exports = router;
