import mongoose from "mongoose";
import {
  apikeyStatusEnum,
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
      required: true,
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
      default: apikeyStatusEnum.Active,
    },
    keyExpiry: {
      type: Date,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    useCount: {
      type: Number,
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

apikeySchema.index({ key: 1 });

const ApiKey = mongoose.model("apikey", apikeySchema);

export default ApiKey;
