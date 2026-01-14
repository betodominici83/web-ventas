const router = require("express").Router();
const productsController = require("../../controllers/products/products.controller");
const auth = require("../../middlewares/auth");
const requireRole = require("../../middlewares/requireRole");

// público: lista
router.get("/", productsController.list);

// admin: crear
router.post("/", auth, requireRole("admin"), productsController.create);

module.exports = router;
