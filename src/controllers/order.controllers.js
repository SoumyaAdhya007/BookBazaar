import CartItem from "../models/cartItem.models.js";
import Order from "../models/order.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user.id;
  const { shippingAddress, billingAddress } = req.body;

  const cartItems = await CartItem.find({ cartId }).populate("bookId");
  if (cartItems.length === 0) {
    throw new ApiError(400, "Cart is empty.");
  }
  let total = 0;
  let books = [];
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].bookId.price * cartItems[i].quantity;
    books.push({
      bookId: cartItems[i].bookId._id,
      quantity: cartItems[i].quantity,
      priceAtPurchased: cartItems[i].bookId.price,
    });
  }
  const order = await Order.create({
    userId,
    books,
    total,
    shippingAddress,
    billingAddress,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Order placed Successfully.", order));
});

const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ userId }).populate("userId books.bookId");
  res
    .status(200)
    .json(new ApiResponse(200, "Order retrieved Successfully.", orders));
});

const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("userId books.bookId");
  res
    .status(200)
    .json(new ApiResponse(200, "Order retrieved Successfully.", order));
});

export { placeOrder, getAllOrders, getOrder };
