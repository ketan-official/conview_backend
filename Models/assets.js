const mongoose = require("mongoose");

const assetsSchema = mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section", // or Buffer, depending on how you're storing images
      required: true,
    },
    subsection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subsection", // or Buffer, depending on how you're storing images
      required: true,
    },
    subChieldsection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subChieldsection", // or Buffer, depending on how you're storing images
    },
    description: {
      type: String,
    },
    additionalParam1: {
      type: String,
      default: "",
    },
    additionalParam2: {
      type: String,
      default: "",
    },
    additionalParam3: {
      type: String,
      default: "",
    },
    additionalParam4: {
      type: String,
      default: "",
    },
    other: {
      type: String,
      default: "",
    },
    image: {
      type: Array, // or Buffer, depending on how you're storing images
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // or Buffer, depending on how you're storing images
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("assets", assetsSchema);
