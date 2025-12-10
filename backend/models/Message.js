const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", msgSchema);
