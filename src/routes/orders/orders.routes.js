const router = require("express").Router();
const ordersController = require("../../controllers/orders/orders.controller");
const requireRole = require("../../middlewares/requireRole");

// Todos (con token) pueden ver/crear
router.get("/", ordersController.list);
router.get("/:id", ordersController.getById);
router.post("/", ordersController.create);

// Solo admin puede cambiar status
router.patch("/:id/status", requireRole("admin"), ordersController.updateStatus);

module.exports = router;
