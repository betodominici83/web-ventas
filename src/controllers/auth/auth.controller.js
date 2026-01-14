const jwt = require("jsonwebtoken");
const authService = require("../../services/auth/auth.service");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ ok: false, error: "email and password required" });

    const exists = await authService.findByEmail(email);
    if (exists)
      return res.status(409).json({ ok: false, error: "User already exists" });

    const user = await authService.createUser({ email, password });
    res.status(201).json({ ok: true, data: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ ok: false, error: "email and password required" });

    const user = await authService.findByEmail(email);
    if (!user)
      return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ ok: true, token });
  } catch (err) {
    next(err);
  }
};
