import Razorpay from "razorpay";
import crypto from "crypto";
import env from "../config/env.config.js";
import asyncHandler from "../utils/async-handler.js";
import Order from "../models/order.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import Payment from "../models/payment.models.js";
import { paymentStatusesEnum, paymentTypesEnum } from "../utils/constants.js";

const razorpayInstance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

const createPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const userId = req.user.id;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  const payment = {
    amount: order.total * 100,
    currency: "INR",
  };

  razorpayInstance.orders.create(payment, async (err, order) => {
    if (err) {
      throw new ApiError(400, "Error while creating payment order.", err);
    } else {
      const payment = await Payment.create({
        orderId,
        userId,
        razorpayOrderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: paymentStatusesEnum.Created,
      });

      res.status(201).json(
        new ApiResponse(201, "Payment order created successfully.", {
          order,
          payment,
        })
      );
    }
  });
});
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;

  const razorpaySignature = req.headers["x-razorpay-signature"];

  const key_secret = env.RAZORPAY_KEY_SECRET;

  let hmac = crypto.createHmac("sha256", key_secret);

  hmac.update(razorpayOrderId + "|" + razorpayPaymentId);

  const generatedSignature = hmac.digest("hex");

  const payment = await Payment.findOne({ razorpayOrderId });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (razorpaySignature === generatedSignature) {
    await Payment.findByIdAndUpdate(payment._id, {
      razorpayPaymentId,
      razorpaySignature,
      status: paymentStatusesEnum.Success,
    });
    await Order.findByIdAndUpdate(payment.orderId, {
      isPaid: true,
      paymentType: paymentTypesEnum.Razorpay,
    });

    res.status(200).json(new ApiResponse(200, "Payment has been verified"));
  } else {
    await Payment.findByIdAndUpdate(payment._id, {
      razorpayPaymentId,
      razorpaySignature,
      status: paymentStatusesEnum.Failed,
    });

    throw new ApiError(400, "Payment verification failed", payment);
  }
});

export { createPayment, verifyPayment };
