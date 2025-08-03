import mongoose from "mongoose";
import logger from "../config/logger.config.js";
import ApiError from "../utils/api-error.js";
import env from "../config/env.config.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";

    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  logger.error(`${error.message}`);

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
