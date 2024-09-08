const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, min: 3, max: 20 },
    lastName: { type: String, trim: true, min: 3, max: 20 },
    email: { type: String, trim: true, unique: true, lowercase: true },
    phone: { type: String, trim: true, unique: true },
    hashedPassword: { type: String, required: true },
    companyName: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    email: { type: String, default: null },
    postalCode: { type: String, default: null },
    prov: { type: String, default: null },
    status: { type: String, default: "user" },
    image: { type: Array, default: "" },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hashedPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hashedPassword);
  },
  matchPassword: async function (password) {
    return await bcrypt.compare(password, this.hashedPassword);
  },
  generateToken: async function () {
    return jwt.sign(
      { _id: this._id, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  },
};

module.exports = mongoose.models.User || mongoose.model("user", userSchema);
