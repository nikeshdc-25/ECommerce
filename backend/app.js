import express from "express";
import notFoundHadler from "./middleware/notFound.Middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import logger from "./middleware/logger.middleware.js";
import cookieParser from "cookie-parser";

// routers import
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";

// Initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// error handlers
app.use(notFoundHadler);
app.use(errorHandler);

export { app };
