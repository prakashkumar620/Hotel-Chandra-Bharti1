const Menu = require("../models/MenuItem");

exports.getMenu = async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
};

exports.addItem = async (req, res) => {
  const item = await Menu.create(req.body);
  res.json(item);
};

exports.editItem = async (req, res) => {
  const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
