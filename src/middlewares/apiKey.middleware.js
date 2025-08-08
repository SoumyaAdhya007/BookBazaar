import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import env from "../config/env.config.js";
import ApiKey from "../models/apikey.models.js";

const apiKeyCheckMiddleware = asyncHandler(async (req, res, next) => {
  const apiKey = req.cookies.apiKey || req.body.apiKey;
  if (!apiKey) {
    throw new ApiError(401, "Unauthorized - Invalid API Key");
  }
  const decode = jwt.verify(apiKey, env.APIKEY_TOKEN_SECRET);
  if (!decode) {
    throw new ApiError(401, "Unauthorized - Invalid API Key");
  }
  if (req.user.id !== decode.userId) {
    throw new ApiError(
      403,
      "Forbidden - API key does not belong to the authenticated user."
    );
  }
  const findApikey = await ApiKey.findOne({
    key: apiKey,
    keyExpiry: { $gt: Date.now() },
  });
  if (!findApikey) {
    throw new ApiError(401, "Unauthorized - Invalid API Key");
  }
  findApikey.useCount = findApikey.useCount + 1;

  await findApikey.save({ validateBeforeSave: false });

  next();
});

export default apiKeyCheckMiddleware;
