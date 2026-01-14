const prisma = require("../../config/prisma");

async function list(req, res) {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ ok: true, data: products });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}

async function create(req, res) {
  try {
    const { name, description, price, imageUrl, stock, active } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ ok: false, error: "name is required" });
    }
    if (price == null || Number.isNaN(Number(price))) {
      return res.status(400).json({ ok: false, error: "price is required (number)" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: Number(price),
        imageUrl: imageUrl || null,
        stock: stock == null ? 0 : Number(stock),
        active: active == null ? true : Boolean(active),
      },
    });

    res.json({ ok: true, data: product });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}

module.exports = { list, create };
