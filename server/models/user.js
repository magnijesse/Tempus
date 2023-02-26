const { EmailAuthCredential } = require("firebase/auth");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  classes: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
