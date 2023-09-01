const mongoose = require("mongoose");
const db = require("./index.js");

const itemSchema = new db.Schema({

  product_name: {
    type: String,
    required: true
  },
  description_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;