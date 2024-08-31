const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema(
  {
    companyName: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    email: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    number: { type: String, default: null },
    phone: { type: String, default: null },
    postalCode: { type: String, default: null },
    prov: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("organization", OrganizationSchema);
