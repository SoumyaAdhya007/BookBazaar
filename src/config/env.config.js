import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.string(),
  LOG_LEVEL: z.string().optional(),
  MONGO_URI: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  MAILTRAP_SMTP_HOST: z.string(),
  MAILTRAP_SMTP_PORT: z.string(),
  MAILTRAP_SMTP_USERNAME: z.string(),
  MAILTRAP_SMTP_PASSWORD: z.string(),
  FORGOT_PASSWORD_REDIRECT_URL: z.string(),
});
const env = envSchema.parse(process.env);
export default env;
