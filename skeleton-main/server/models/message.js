const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
