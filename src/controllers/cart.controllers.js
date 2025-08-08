import ApiResponse from "../utils/api-response.js";
import Cart from "../models/cart.models.js";
import CartItem from "../models/cartItem.models.js";
import asyncHandler from "../utils/async-handler.js";
import Book from "../models/book.models.js";
import ApiError from "../utils/api-error.js";

const createCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.create({
    userId,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Cart created successfully.", cart));
});

const getAllCarts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.find({
    userId,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Cart retrieved successfully.", cart));
});

const addItemToCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { bookId, quantity } = req.body;

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(404, "Book doest not exist");
  }
  const cart = await Cart.findById(id);

  if (!cart) {
    throw new ApiError(404, "Cart doest not exist");
  }

  const cartItem = await CartItem.create({
    cartId: id,
    userId,
    bookId: book._id,
    quantity,
    priceAtAdd: book.price,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Item added to Cart successfully.", cartItem));
});

const getCartItems = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cartItem = await CartItem.find({
    cartId: id,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Cart items retrieved successfully.", cartItem));
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;

  const cartItem = await CartItem.findByIdAndDelete(cartItemId);

  if (!cartItem) {
    throw new ApiError(404, "CartItem does not exist.");
  }
  res.status(204).json(new ApiResponse(204, "Cart Item removed successfully."));
});

const deleteCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) {
    throw new ApiError(404, "Cart does not exist.");
  }
  res.status(204).json(new ApiResponse(204, "Cart deleted successfully."));
});
export {
  createCart,
  getAllCarts,
  addItemToCart,
  getCartItems,
  removeCartItem,
  deleteCart,
};
