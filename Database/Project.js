const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    projectImg: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    buildBy: {
      type: String,
      required: true,
    },
    techImg: {
      type: Array,
      required: true,
    },
    projectDescription: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("project", ProjectSchema);
