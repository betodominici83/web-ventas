const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const ctrl = require("../controllers/products.controller");

// Público
router.get("/", ctrl.getAll);

// Solo admin puede crear
router.post("/", auth, requireAdmin, ctrl.create);

module.exports = router;
