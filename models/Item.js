const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
