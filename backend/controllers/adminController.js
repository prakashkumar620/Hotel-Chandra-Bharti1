const Admin = require("../models/Admin");
const User = require("../models/User");
const Message = require("../models/Message");
const MenuItem = require("../models/MenuItem");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createDefaultAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: "hotelchandrabharti@gmail.com" });
    if (exists) return res.json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash("durgapummi", 10);
    await Admin.create({ email: "hotelchandrabharti@gmail.com", password: hashed });
    res.json({ message: "Default admin created: hotelchandrabharti@gmail.com / durgapummi" });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin" });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: admin._id, admin: true },
    process.env.JWT_SECRET
  );
  res.json({ token });
};

exports.getMenuAdmin = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password -resetOtp -resetOtpExpires");
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

exports.getMessages = async (req, res) => {
  const msgs = await Message.find().sort({ date: -1 });
  res.json(msgs);
};
