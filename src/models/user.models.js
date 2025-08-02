import mongoose from "mongoose";
import { userRolesEnum, AvailableUserRoles } from "../utils/constants.js";
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

userSchema.index({ email: 1 });

const User = mongoose.model("user", userSchema);

export default User;
