import mongoose from "mongoose";
import {
  apikeyStatusesEnum,
  AvailableApiKeyStatuses,
} from "../utils/constants.js";
const apikeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      default: "My API Key",
    },
    description: {
      type: String,
    },
    key: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableApiKeyStatuses,
      default: apikeyStatusesEnum.Active,
    },
    keyExpiry: {
      type: Date,
      required: true,
    },
    limit: {
      type: Number,
      default: 1000,
    },
    useCount: {
      type: Number,
      default: 0,
    },
    lastUsed: {
      type: Date,
    },
    revokedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ApiKey = mongoose.model("apikey", apikeySchema);

export default ApiKey;
