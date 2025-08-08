import Book from "../models/book.models.js";
import Order from "../models/order.models.js";
import Review from "../models/review.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

const postBooks = asyncHandler(async (req, res) => {
  const { books } = req.body;

  const addBooks = await Book.insertMany(books);

  res
    .status(201)
    .json(
      new ApiResponse(201, "Books added successfully", { books: addBooks })
    );
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  res
    .status(200)
    .json(new ApiResponse(201, "Books retrieved successfully", books));
});

const getBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, "Book doest not exist");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Book retrieved successfully", book));
});

const putBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { book } = req.body;

  const updateBook = await Book.findByIdAndUpdate(id, book);
  if (!updateBook) {
    throw new ApiError(404, "Book doest not exist");
  }

  res.status(201).json(new ApiResponse(201, "Books updated successfully"));
});
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new ApiError(404, "Book does not exist.");
  }
  res.status(204).json(new ApiResponse(204, "Book delete successfully"));
});
const postBookReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.id;
  const { rating, comment } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book does not exist.");
  }
  const order = await Order.find({ bookId, userId, isPaid: true });
  if (order.length === 0) {
    throw new ApiError(
      401,
      "Review can only be submitted for purchased books."
    );
  }
  const review = await Review.create({
    bookId,
    userId,
    rating,
    comment,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Review post successfully", review));
});

const getBookReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book does not exist.");
  }
  const reviews = await Review.find({ bookId });

  res
    .status(200)
    .json(new ApiResponse(200, "Reviews retrieved successfully", reviews));
});
const deleteBookReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new ApiError(404, "Review does not exist.");
  }
  res.status(204);
});
export {
  postBooks,
  getAllBooks,
  getBook,
  putBook,
  deleteBook,
  postBookReview,
  getBookReviews,
  deleteBookReview,
};
