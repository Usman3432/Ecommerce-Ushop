import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import { getResetPasswordTemp } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/error_handler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

//Register user     => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

//Login user     => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 401));
  }
  // Find user in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Please enter valid email & password", 401));
  }
  //Check password
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Please enter valid email & password", 401));
  }
  sendToken(user, 200, res);
});

//Logout user     => /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

//Forgot user password     => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find user in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(`User not found with this email`, 400));
  }
  //Get resetPasswordToken
  const resetToken = user.getResetPasswordToken();
  await user.save();
  //Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;
  const message = getResetPasswordTemp(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Ushop Recover Your Password",
      message,
    });
    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});

//Reset password      => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash the url token
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
      new ErrorHandler("Password reset token is invalid or expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password should be matched", 400));
  }

  //Set new Password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get current user profile => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    user,
  });
});

//Update password  => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");

  // Checking the current password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.password = req.body.password;
  user.save();

  res.status(200).json({
    success: true,
  });
});

//Update user profile  => /api/v1/profile/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

//All User    -- ADMIN   => /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

//Get User Details   -- ADMIN   => /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    user,
  });
});



//Update user details -- ADMIN  => /api/v1/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});


//Delete User -- ADMIN  => /api/v1/admin/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with this id: ${req.params.id}`, 404)
    );
  }

  //TODO - Remove user avatar from cloudnary

  await user.deleteOne();

  res.status(200).json({
    message: "User Deleted Successfully"
  });
});