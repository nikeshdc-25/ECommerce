import express from "express";

// routers import
import userRouter from "./routes/user.router.js";
// Initialize express app
const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);

export { app };
