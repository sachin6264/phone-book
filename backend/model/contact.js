const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, required: true, unique: true },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    number: { type: String, requird: true },
    address: {
      Country: String,
      State: String,
      City: String,
      Pincode: String,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
