import { Router } from "express";
import authAccessMiddleware from "../middlewares/auth.middlewares.js";
import adminCheckMiddleware from "../middlewares/admin.middlewares.js";
import apiKeyCheckMiddleware from "../middlewares/apiKey.middleware.js";
import validateData from "../middlewares/validation.middlewares.js";
import {
  deleteBookValidation,
  deleteBookReviewsValidation,
  getBookAllReviewsValidation,
  postBookReviewsValidation,
  postBooksValidation,
  putBooksValidation,
  getBookDetailsValidation,
} from "../validations/book.validations.js";
import {
  getAllBooks,
  getBook,
  putBook,
  postBooks,
  postBookReview,
  getBookReviews,
  deleteBookReview,
  deleteBook,
} from "../controllers/book.controllers.js";

const router = Router();

router
  .route("/")
  .post(
    authAccessMiddleware,
    adminCheckMiddleware,
    apiKeyCheckMiddleware,
    validateData(postBooksValidation),
    postBooks
  );

router.route("/").get(authAccessMiddleware, apiKeyCheckMiddleware, getAllBooks);

router
  .route("/:id")
  .get(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(getBookDetailsValidation),
    getBook
  );

router
  .route("/:id")
  .put(
    authAccessMiddleware,
    adminCheckMiddleware,
    apiKeyCheckMiddleware,
    validateData(putBooksValidation),
    putBook
  );

router
  .route("/:id")
  .delete(
    authAccessMiddleware,
    adminCheckMiddleware,
    apiKeyCheckMiddleware,
    validateData(deleteBookValidation),
    deleteBook
  );

// books review routes
router
  .route("/:bookId/reviews")
  .post(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(postBookReviewsValidation),
    postBookReview
  );
router
  .route("/:bookId/reviews")
  .get(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(getBookAllReviewsValidation),
    getBookReviews
  );
router
  .route("/reviews/:id")
  .delete(
    authAccessMiddleware,
    adminCheckMiddleware,
    apiKeyCheckMiddleware,
    validateData(deleteBookReviewsValidation),
    deleteBookReview
  );

export default router;
