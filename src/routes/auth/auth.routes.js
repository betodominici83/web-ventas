const router = require("express").Router();
const authController = require("../../controllers/auth/auth.controller");
const auth = require("../../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);

// ✅ nuevo endpoint: devuelve el usuario del token
router.get("/me", auth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

module.exports = router;

