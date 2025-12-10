const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminMiddleware");
const { getMenu, addItem, editItem, deleteItem } = require("../controllers/menuController");

router.get("/", getMenu);
router.post("/", adminAuth, addItem);
router.put("/:id", adminAuth, editItem);
router.delete("/:id", adminAuth, deleteItem);

module.exports = router;
