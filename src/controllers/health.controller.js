exports.health = (req, res) => {
  res.json({ ok: true, name: "vexara-backend", time: new Date().toISOString() });
};
