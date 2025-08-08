import { z } from "zod";

const addItemToCartValidation = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    bookId: z.string(),
    quantity: z.number().min(1).max(10),
    priceAtAdd: z.number(),
  }),
};

const getCartItemsValidation = {
  params: z.object({
    id: z.string(),
  }),
};

const removeCartItemValidation = {
  params: z.object({
    cartItemId: z.string(),
  }),
};
const deleteCartValidation = {
  params: z.object({
    id: z.string(),
  }),
};

export {
  addItemToCartValidation,
  getCartItemsValidation,
  removeCartItemValidation,
  deleteCartValidation,
};
