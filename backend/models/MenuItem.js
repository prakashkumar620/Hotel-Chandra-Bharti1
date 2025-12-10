const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  priceHalf: Number,
  priceFull: Number,
  img: String
});

module.exports = mongoose.model("MenuItem", menuSchema);
