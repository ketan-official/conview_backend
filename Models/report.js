const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    jobNumber: { type: String, default: null },
    projectName: { type: String, default: null },
    customer: { type: String, default: null },
    siteContact: { type: String, default: null },
    dateCreated: { type: String, default: "Yes" },
    status: { type: String, default: "pending" },
    emailSent: { type: String, default: "Yes" },
    emailSentTo: { type: String, default: null },
    type: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", ReportSchema);
