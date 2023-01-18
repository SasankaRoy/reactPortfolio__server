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
    projectLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("project", ProjectSchema);

// It Is A Full Stack MERN Project.
// In Frontend I Used Reat.Js, Tailwind.Css, Redux, Etc.
// In Backend I Used Node.Js, Express.Js, Mongodb, Mongoose, Etc.
// In This Webapp We Can Chat, Make Friends, Follow Them, View Their Post And At The Same Time Like And Comment On It.
// It Is Totally Safe And Secure In Terms Of Privacy, Only The Authenticated Users Are Allowed And No Personal Details Are Leaked.
