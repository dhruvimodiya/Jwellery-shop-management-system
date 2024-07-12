const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter a Your Email"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    otp: {
      type: String,
      required: true,
    },
    //After 5 min it will deleted automatically
    createdAt: { type: Date, default: Date.now(), index: { expires: 300 } },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OTP", otpSchema);
