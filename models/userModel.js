const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please Enter a Your Name"],

    minLength: [4, "Name should have more than 4 Characters"],
  },
  lname: {
    type: String,
    required: [true, "Please Enter a Your Name"],

    minLength: [4, "Name should have more than 4 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter a Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  address: {
    type: String,
    required: [true, "Please Enter a Your address"],
  },
  gender: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
  password: {
    type: String,
    required: [true, "Please Enter a Your Password"],
    minLength: [8, "Password should be grater than 8 Characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating reset password token
userSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and add to a userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 16 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
