const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    catId: { type: mongoose.Schema.Types.ObjectId, ref: "section" },
    subCatId: { type: mongoose.Schema.Types.ObjectId, ref: "subsection" },
    type: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subChieldsection", sectionSchema);
