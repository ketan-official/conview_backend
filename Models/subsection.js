const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "section" },
    type: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subsection", sectionSchema);
