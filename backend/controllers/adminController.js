const Admin = require("../models/Admin");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Default Admin (if no admin exists)
const createDefaultAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const defaultEmail = "admin@hotelchandrabharti.com";
    const defaultPassword = "admin123";

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const newAdmin = new Admin({
      email: defaultEmail,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({
      message: "Default admin created successfully",
      email: defaultEmail,
      password: defaultPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Menu (Admin)
const getMenuAdmin = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  adminLogin,
  createDefaultAdmin,
  getMenuAdmin,
  getUsers,
  deleteUser,
  getMessages
};
