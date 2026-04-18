const mongoose = require("mongoose");

// now we will call the function

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "Email already exists"],
  },
  password: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
