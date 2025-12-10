const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const msg = await Message.create(req.body);
  res.json({ message: "Message stored", msg });
};
