const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: String,
  classid: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
