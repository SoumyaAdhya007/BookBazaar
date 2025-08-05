import { Router } from "express";

import {
  emailVerify,
  forgotPassword,
  generateApiKey,
  getUserProfile,
  loginUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetPassword,
} from "../controllers/auth.controllers.js";

import validateData from "../middlewares/validation.middlewares.js";

import {
  registerUserValidation,
  loginUserValidation,
  emailVerifyValidation,
  resendEmailVerificationValidation,
  refreshAccessTokenValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validations/auth.validations.js";

const router = Router();

// register user
router
  .route("/register")
  .post(validateData(registerUserValidation), registerUser);

// login user
router.route("/login").post(validateData(loginUserValidation), loginUser);

// verify email
router
  .route("/email/verify/:token")
  .get(validateData(emailVerifyValidation), emailVerify);

// resend verification email
router
  .route("/email/resend-verification")
  .post(
    validateData(resendEmailVerificationValidation),
    resendEmailVerification
  );

// generate new API key
router.route("/api-key").post(generateApiKey);

// refresh access token
router
  .route("/refresh-access-token")
  .post(validateData(refreshAccessTokenValidation), refreshAccessToken);

// get user profile
router.route("/me").get(getUserProfile);

// forgot password email
router
  .route("/email/forgot-password")
  .post(validateData(forgotPasswordValidation), forgotPassword);

// reset password
router
  .route("/reset-password/:token")
  .post(validateData(resetPasswordValidation), resetPassword);

export default router;
