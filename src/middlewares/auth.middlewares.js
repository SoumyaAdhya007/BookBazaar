import jwt from "jsonwebtoken";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import env from "../config/env.config.js";

const authAccessMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers?.authorization?.split(" ")[1] ||
    req.body.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized - Invalid token.");
  }
  const decode = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  if (!decode) {
    throw new ApiError(401, "Unauthorized - Invalid token.");
  }

  req.user = decode;

  next();
});

export default authAccessMiddleware;
