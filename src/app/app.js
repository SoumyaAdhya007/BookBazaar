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

// routes
import AuthRouter from "../routes/auth.routes.js";
import BookRouter from "../routes/book.routes.js";
import ReviewRouter from "../routes/review.routes.js";
import CartRouter from "../routes/cart.routes.js";
import PaymentRouter from "../routes/payment.routes.js";
import OrderRouter from "../routes/order.routes.js";

app.use("/api/v1", AuthRouter);
app.use("/api/v1", BookRouter);
app.use("/api/v1", ReviewRouter);
app.use("/api/v1", CartRouter);
app.use("/api/v1", PaymentRouter);
app.use("/api/v1", OrderRouter);

app.use(errorHandler);
export default app;
