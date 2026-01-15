const prisma = require("../prisma/client");

exports.getAll = async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  res.json(products);
};

exports.create = async (req, res) => {
  const { name, description, price, imageUrl, stock, active } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "name y price son requeridos" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description: description ?? null,
      price: Number(price),
      imageUrl: imageUrl ?? null,
      stock: stock === undefined ? 0 : Number(stock),
      active: active === undefined ? true : Boolean(active),
    },
  });

  res.status(201).json(product);
};
