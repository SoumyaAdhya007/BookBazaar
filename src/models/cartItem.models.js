import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },
    priceAtAdd: {
      type: Number,
      required: true,
    },
    isOrdered: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  },
  { timestamps: true }
);

cartItemSchema.index({ cartId: 1, bookId: 1 });

const CartItem = mongoose.model("cartItem", cartItemSchema);

export default CartItem;
