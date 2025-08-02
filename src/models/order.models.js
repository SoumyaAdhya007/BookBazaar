import mongoose from "mongoose";
import {
  orderStatusesEnum,
  AvailableOrderStatuses,
  AvailablePaymentTypes,
} from "../utils/constants.js";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    books: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          max: 10,
          default: 1,
        },
        priceAtPurchased: {
          type: Number,
          required,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: JSON,
      required: true,
    },
    billingAddress: {
      type: JSON,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentType: {
      type: String,
      enum: AvailablePaymentTypes,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableOrderStatuses,
      default: orderStatusesEnum.Pending,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ userId: true });

const Order = mongoose.model("order", orderSchema);

export default Order;
