import { z } from "zod";

const placeOrderValidation = {
  params: z.object({
    cartId: z.string(),
  }),
  body: z.object({
    shippingAddress: z.json(),
    billingAddress: z.json(),
  }),
};
const getOrderValidation = {
  params: z.object({
    id: z.string(),
  }),
};
export { placeOrderValidation, getOrderValidation };
