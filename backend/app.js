import express from "express";
import notFoundHadler from "./middleware/notFound.Middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import logger from "./middleware/logger.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";

// routers import
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";

// Initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);

// error handlers
app.use(notFoundHadler);
app.use(errorHandler);

export { app };
