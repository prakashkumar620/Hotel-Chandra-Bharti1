const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminMiddleware");
const {
  adminLogin,
  createDefaultAdmin,
  getMenuAdmin,
  getUsers,
  deleteUser,
  getMessages
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/create-default-admin", createDefaultAdmin);
router.get("/menu", adminAuth, getMenuAdmin);
router.get("/users", adminAuth, getUsers);
router.delete("/users/:id", adminAuth, deleteUser);
router.get("/messages", adminAuth, getMessages);

module.exports = router;
