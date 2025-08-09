import { Router } from "express";
import authAccessMiddleware from "../middlewares/auth.middlewares.js";
import apiKeyCheckMiddleware from "../middlewares/apiKey.middleware.js";
import {
  createPayment,
  verifyPayment,
} from "../controllers/payment.controllers.js";
import validateData from "../middlewares/validation.middlewares.js";
import { createPaymentValidation } from "../validations/payment.validations.js";

const router = Router();
router
  .route("/create")
  .post(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(createPaymentValidation),
    createPayment
  );
router
  .route("/verify")
  .post(
    authAccessMiddleware,
    apiKeyCheckMiddleware,
    validateData(verifyPayment),
    verifyPayment
  );
export default router;
