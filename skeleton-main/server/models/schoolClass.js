const mongoose = require("mongoose");

const SchoolClassSchema = new mongoose.Schema({
  name: String,
  classid: String,
  blockNumber: int
});

// compile model from schema
module.exports = mongoose.model("schoolClass", SchoolClassSchema);
