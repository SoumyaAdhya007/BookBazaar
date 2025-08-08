import { Router } from "express";
import authAccessMiddleware from "../middlewares/auth.middlewares.js";
import apiKeyCheckMiddleware from "../middlewares/apiKey.middleware.js";
import { getAllOrders, getOrder, placeOrder } from "../controllers/order.controllers.js";
import validateData from "../middlewares/validation.middlewares.js";
import {
  getOrderValidation,
  placeOrderValidation,
} from "../validations/order.validations.js";

const router = Router();

router
  .route("/:cartId")
  .post(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(placeOrderValidation),
    placeOrder
  );
router
  .route("/")
  .get(authAccessMiddleware, apiKeyCheckMiddleware, getAllOrders);
router
  .route("/:id")
  .get(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(getOrderValidation),
    getOrder
  );
export default router;
