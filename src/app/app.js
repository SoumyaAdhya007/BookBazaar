import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// config
import env from "../config/env.config.js";
import { errorHandler } from "../middlewares/error.middlewares.js";
const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? "*" : env.CORS_ORIGIN?.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);
export default app;
