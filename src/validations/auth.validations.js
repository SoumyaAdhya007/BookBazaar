import { email, z } from "zod";

const registerUserValidation = {
  body: z.object({
    name: z.string(),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase  letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  }),
};

const loginUserValidation = {
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string(),
  }),
};

const emailVerifyValidation = {
  params: z.object({
    token: z.string(),
  }),
};

const resendEmailVerificationValidation = {
  body: z.object({
    email: z.string().email("Invalid email address."),
  }),
};

const refreshAccessTokenValidation = {
  cookies: z.object({
    refreshToken: z.string().optional(),
  }),
  body: z.object({
    refreshToken: z.string().optional(),
  }),
};

const forgotPasswordValidation = {
  body: z.object({
    email: z.string().email("Invalid email address."),
  }),
};

const resetPasswordValidation = {
  params: z.object({ token: z.string() }),
  body: z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase  letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  }),
};

export {
  registerUserValidation,
  loginUserValidation,
  emailVerifyValidation,
  resendEmailVerificationValidation,
  refreshAccessTokenValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
