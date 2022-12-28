const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    aboutPic: {
      type: String,
    },
    smallDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("about", AboutSchema);
