const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({
      name,
      email,
      mobile,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage };
