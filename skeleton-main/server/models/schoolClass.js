const mongoose = require("mongoose");
import ThreadPage from "./pages/Thread.js";

const SchoolClassSchema = new mongoose.Schema({
  name: String,
  classid: String,
  blockNumber: internalIP,
  thread: ThreadPage

});

// compile model from schema
module.exports = mongoose.model("schoolClass", SchoolClassSchema);
