const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    ContactNumber: {
      type: Number,
    },
    EmailAddress: {
      type: String,
    },
    Address: {
      type: String,
    },
    Messages: {
      type: Array,
      senderName: String,
      senderEmail: String,
      message: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", ContactSchema);
