const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin.middleware");
const ctrl = require("../controllers/orders.controller");

// Crear pedido (público)
router.post("/", ctrl.create);

// A partir de acá: solo admin
router.use(auth, requireAdmin);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.patch("/:id/status", ctrl.updateStatus);

module.exports = router;
