const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    location: {
      type: String,
    },
    company: {
      type: String,
    },
    role: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    postCode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

/* userSchema.index({ ipAddress: 1 }, { unique: true, sparse: true }); */

const User = mongoose.model("User", userSchema);
module.exports = User;
