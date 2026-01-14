const prisma = require("../../config/prisma");

exports.makeAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: "email required" });

    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
      select: { id: true, email: true, role: true },
    });

    res.json({ ok: true, data: user });
  } catch (err) {
    next(err);
  }
};
