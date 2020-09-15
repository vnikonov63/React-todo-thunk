const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [],
});

module.exports = mongoose.model("User", userSchema);
