const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: String,
  classid: String,
  blockNumber: Number,
});

// compile model from schema
module.exports = mongoose.model("class", ClassSchema);

