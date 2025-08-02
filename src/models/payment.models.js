import mongoose from "mongoose";
import {
  AvailablePaymentMethods,
  AvailablePaymentStatuses,
} from "../utils/constants.js";
const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      unique: true,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      unique: true,
      required: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    status: {
      type: String,
      enum: AvailablePaymentStatuses,
      required: true,
    },
    method: {
      type: String,
      enum: AvailablePaymentMethods,
      required: true,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
    failureReason: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

paymentSchema.index({ orderId: 1, userId: 1 });

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
