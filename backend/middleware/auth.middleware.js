import jwt from "jsonwebtoken";
import asyncHandler from "./asynchandler.middleware.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

const checkAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    throw new ApiError(401, "You must be logged in!");
  }
  try {
    let { userId } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userId);
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (e) {
    throw new ApiError(401, "Invalid Token");
  }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
  let isAdmin = req.user?.isAdmin;
  if (isAdmin) next();
  else {
    let err = new Error("You are not authorized to perform this operation!");
    err.status = 403;
    throw err;
  }
});

export { checkAuth, checkAdmin };
