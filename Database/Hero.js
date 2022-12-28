const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    heroLines: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hero", HeroSchema);
