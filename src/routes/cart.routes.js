import { Router } from "express";
import authAccessMiddleware from "../middlewares/auth.middlewares.js";
import apiKeyCheckMiddleware from "../middlewares/apiKey.middleware.js";
import validateData from "../middlewares/validation.middlewares.js";
import {
  addItemToCartValidation,
  deleteCartValidation,
  getCartItemsValidation,
  removeCartItemValidation,
} from "../validations/cart.validations.js";
import {
  addItemToCart,
  createCart,
  deleteCart,
  getAllCarts,
  getCartItems,
  removeCartItem,
} from "../controllers/cart.controllers.js";

const router = Router();

router
  .route("/create")
  .get(authAccessMiddleware, apiKeyCheckMiddleware, createCart);

router.route("/").get(authAccessMiddleware, apiKeyCheckMiddleware, getAllCarts);

router
  .route("/:id/add")
  .post(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(addItemToCartValidation),
    addItemToCart
  );

router
  .route("/:id")
  .get(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(getCartItemsValidation),
    getCartItems
  );

router
  .route("/remove/:cartItemId")
  .delete(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(removeCartItemValidation),
    removeCartItem
  );

router
  .route("/:id")
  .delete(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(deleteCartValidation),
    deleteCart
  );

export default router;
