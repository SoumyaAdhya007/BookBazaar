import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import ApiKey from "../models/apikey.models.js";
import User from "../models/user.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

//  generate access and refresh token, and save refresh token and expiry to user db.
const generateAccessAndRefreshToken = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  user.refreshTokenExpires = Date.now() + 10 * 24 * 60 * 60 * 1000;

  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

// cookie options
const cookieOption = (maxAge) => {
  return {
    httpOnly: true,
    secure: env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: maxAge, // cookie expiry in milliseconds
  };
};

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exist.");
  }

  const newUser = await User.create({ name, email, password });

  res.status(201).json(
    new ApiResponse(201, "User register successfully", {
      user: newUser,
    })
  );
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOption(24 * 60 * 60 * 1000))
    .cookie(
      "refreshToken",
      refreshToken,
      cookieOption(10 * 24 * 60 * 60 * 1000)
    )
    .json(
      new ApiResponse(200, "Login successfully", {
        user,
        accessToken,
        refreshToken,
      })
    );
});

// verify email
const emailVerify = asyncHandler(async (req, res) => {});

// resend verification email
const resendEmailVerification = asyncHandler(async (req, res) => {});

// generate new API key
const generateApiKey = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const apiKey = await ApiKey.create({
    userId,
    key: jwt.sign(
      {
        userId,
      },
      env.APIKEY_TOKEN_SECRET,
      { expiresIn: env.APIKEY_TOKEN_EXPIRY }
    ),
    keyExpiry: Date.now() + 90 * 24 * 60 * 60 * 1000,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "API key generated successfully", apiKey));
});

// get all API keys
const getApiKeys = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const apiKeys = await ApiKey.find({
    userId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "API key generated successfully", apiKeys));
});

// refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select(
    "-password -oldPasswords -verificationToken -refreshToken -resetPasswordToken -verificationExpires -refreshTokenExpires -resetPasswordExpires"
  );
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully", user));
});

// forgot password email
const forgotPassword = asyncHandler(async (req, res) => {});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  res.json(token, password);
});

export {
  registerUser,
  loginUser,
  emailVerify,
  resendEmailVerification,
  generateApiKey,
  getApiKeys,
  refreshAccessToken,
  getUserProfile,
  forgotPassword,
  resetPassword,
};
