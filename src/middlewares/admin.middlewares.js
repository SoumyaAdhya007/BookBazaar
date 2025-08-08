import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.models.js";
import { userRolesEnum } from "../utils/constants.js";
const adminCheckMiddleware = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(404, "Unauthorized - Invalid user id.");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }
  if (user.role === userRolesEnum.Admin) {
    return next();
  }
  throw new ApiError(
    403,
    "User does not have permission to access this route."
  );
});

export default adminCheckMiddleware;
