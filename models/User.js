
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    isSearching: {
      type: Boolean,
      default: false,
    },
    isChatting: {
      type: Boolean,
      default: false,
    },
    blockedUsers: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
