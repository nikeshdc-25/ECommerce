import express from "express";
import notFoundHadler from "./middleware/notFound.Middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import logger from "./middleware/logger.middleware.js";

// routers import
import userRouter from "./routes/user.router.js";
// Initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(logger);

// routes
app.use("/api/v1/users", userRouter);

// error handlers
app.use(notFoundHadler);
app.use(errorHandler);

export { app };
