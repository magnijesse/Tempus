const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: String,
  classid: String,
  days: [String],
  creator: String,
  startTime: String,
  endTime: String,
});

// compile model from schema
module.exports = mongoose.model("class", ClassSchema);
