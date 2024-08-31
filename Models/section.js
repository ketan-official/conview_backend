const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    type: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("section", sectionSchema);
