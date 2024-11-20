import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Users", UserSchema, "Users");
