const ordersService = require("../../services/orders/orders.service");

const allowedStatus = new Set(["new", "in_progress", "completed", "cancelled"]);

exports.list = async (req, res, next) => {
  try {
    const orders = await ordersService.listOrders();
    const parsed = orders.map((o) => ({ ...o, items: JSON.parse(o.items) }));
    res.json({ ok: true, data: parsed });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    const order = await ordersService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ ok: false, error: "Order not found" });
    }

    order.items = JSON.parse(order.items);
    res.json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { customerName, items, notes } = req.body;

    if (!customerName || typeof customerName !== "string") {
      return res.status(400).json({ ok: false, error: "customerName is required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, error: "items must be a non-empty array" });
    }

    const order = await ordersService.createOrder({
      customerName,
      items,
      notes: notes || null,
    });

    order.items = items;
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isFinite(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }
    if (!status || !allowedStatus.has(status)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid status. Use: new, in_progress, completed, cancelled",
      });
    }

    const updated = await ordersService.updateStatus(id, status);
    updated.items = JSON.parse(updated.items);

    res.json({ ok: true, data: updated });
  } catch (err) {
    // Prisma "record not found"
    if (err?.code === "P2025") return res.status(404).json({ ok: false, error: "Order not found" });
    next(err);
  }
   async function updateStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowed = ["new", "in_progress", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ ok: false, error: "Invalid status" });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return res.json({ ok: true, data: updated });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

};
