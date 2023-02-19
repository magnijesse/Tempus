const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: String,
  classid: String,
  blockNumber: int,
  startTime: int,
  endTime: int
});

// compile model from schema
module.exports = mongoose.model("class", ClassSChema);
