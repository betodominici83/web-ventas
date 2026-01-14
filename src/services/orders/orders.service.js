const prisma = require("../../config/prisma");

exports.listOrders = () => {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" } });
};

exports.getOrderById = (id) => {
  return prisma.order.findUnique({ where: { id } });
};

exports.createOrder = ({ customerName, items, notes }) => {
  return prisma.order.create({
    data: {
      customerName,
      items: JSON.stringify(items),
      notes,
    },
  });
};

exports.updateStatus = (id, status) => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
};
