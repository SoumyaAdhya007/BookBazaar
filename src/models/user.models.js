import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userRolesEnum, AvailableUserRoles } from "../utils/constants.js";
import env from "../config/env.config.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    oldPasswords: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: userRolesEnum.User,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    verificationExpires: {
      type: Date,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(env.BCRYPT_SALT)
  );
  this.password = hashedPassword;

  next();
});

// compare user given password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate email verification token with expiry
userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  const expiry = 24 * 60 * 60 * 1000; //1day

  return { token, expiry };
};

// generate forget password email token with expiry
userSchema.methods.generateForgetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  const expiry = 60 * 60 * 1000; // 1hour

  return { token, expiry };
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });
};
// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
};


const User = mongoose.model("user", userSchema);

export default User;
