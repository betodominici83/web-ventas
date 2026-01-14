const router = require("express").Router();
const healthController = require("../controllers/health.controller");

const authRoutes = require("./auth/auth.routes");
const adminRoutes = require("./admin/admin.routes");
const ordersRoutes = require("./orders/orders.routes");
const productsRoutes = require("./products/products.routes");


const auth = require("../middlewares/auth");

router.get("/health", healthController.health);

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productsRoutes);

// protegido con JWT
router.use("/orders", auth, ordersRoutes);

module.exports = router;
