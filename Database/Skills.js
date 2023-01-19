const mongoose = require("mongoose");
const SkillSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    skillImg: {
      type: String,
      required: true,
    },
    skillPerct: {
      type: Number,
      required: true,
      max: 100,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("skill", SkillSchema);
