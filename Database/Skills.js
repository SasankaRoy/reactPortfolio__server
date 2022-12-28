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
  },
  { timestamps: true }
);
module.exports = mongoose.model("skill", SkillSchema);
