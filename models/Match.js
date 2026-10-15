const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    user1: {
      type: Number,
      required: true,
    },

    user2: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Match", matchSchema);