import ApiError from "../utils/api-error.js";

const validateData = (schema) => {
  return (req, res, next) => {
    let errors = [];
    if (schema.body) {
      const validateBody = schema.body.safeParse(req.body);
      if (validateBody?.success) {
        req.body = validateBody.data;
      } else {
        validateBody.error.issues.map((iss) => {
          errors.push({ [iss.path[0]]: iss.message });
        });
      }
    }
    if (schema.params) {
      const validateParams = schema.params.safeParse(req.params);
      if (validateParams.success) {
        req.params = validateParams.data;
      } else {
        validateParams.error.issues.map((iss) => {
          errors.push({ [iss.path[0]]: iss.message });
        });
      }
    }
    if (schema.cookies) {
      const validateCookies = schema.cookies.safeParse(req.cookies);
      if (validateCookies.success) {
        req.params = validateCookies.data;
      } else {
        validateParams.error.issues.map((iss) => {
          errors.push({ [iss.path[0]]: iss.message });
        });
      }
    }
    if (errors.length > 0) {
      throw new ApiError(422, "Received invalid data.", errors);
    }
    return next();
  };
};

export default validateData;
