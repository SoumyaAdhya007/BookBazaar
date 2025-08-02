import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ userId: 1 });

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
