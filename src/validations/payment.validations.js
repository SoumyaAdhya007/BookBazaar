import { z } from "zod";

const createPaymentValidation = {
  body: z.object({
    orderId: z.string(),
  }),
};
const verifyPayment = {
  body: z.object({
    razorpayOrderId: z.string(),
    razorpayPaymentId: z.string(),
  }),
};

export { createPaymentValidation, verifyPayment };
