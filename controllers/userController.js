const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Otp = require("../Models/otpModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const otpGenerator = require("otp-generator");
//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "profile",
    width: 150,
    crop: "scale",
  });
  const {
    fname,
    lname,
    email,
    address,
    gender,
    mobilenumber,
    pincode,
    password,
  } = req.body;

  const user = await User.create({
    fname,
    lname,
    email,
    address,
    gender,
    mobilenumber,
    pincode,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);

  //Send to the user.
  const message = `Dear ${name},

  We are thrilled to welcome you to jewellery ! Thank you for creating an account with us. Get ready to experience a world of convenience, variety, and unbeatable deals right at your fingertips.
  
  Happy Shopping.
  `;

  const subject = `Welcome to jewellery - Start Shopping Today!`;
  try {
    await sendEmail({
      email: user.email,
      subject,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
exports.verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  const otpHolder = await Otp.find({
    email,
  });
  console.log("otp holder", otpHolder);
  if (otpHolder.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "You Used Expired OTP" });
  }
  const rightOTPFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOTPFind.otp);

  if (rightOTPFind.email === req.body.email && validUser) {
    return res
      .status(200)
      .json({ success: true, message: "OTP Verified Successfully" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Your OTP was Wrong" });
  }
});

exports.sendOtp = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otp = new Otp({ email: email, otp: OTP });

  const salt = await bcrypt.genSalt(10);

  otp.otp = await bcrypt.hash(otp.otp, salt);
  await otp.save();
  const message = `Dear User,

  Your OTP is : ${OTP}
  `;

  const subject = `Verification Email`;
  try {
    await sendEmail({
      email: email,
      subject,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
  return res
    .status(200)
    .json({ success: true, message: "OTP sent Successfully" });
});

//Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // cheacking if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//logout a user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

  const subject = "jewellery Password Recovery.";
  try {
    await sendEmail({
      email: user.email,
      subject,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or Expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get user Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update user Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    address: req.body.address,
    gender: req.body.gender,
    mobilenumber: req.body.mobilenumber,
    pincode: req.body.pincode,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "profile",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all the users -- admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user details -- admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does not Exist With Id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user Role  --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.fname,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData);

  res.status(200).json({
    success: true,
    user,
  });
});

//Delete user  --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id ${req.params.id}`, 400)
    );
  }

  //we  remove cloudinary
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully.",
  });
});
