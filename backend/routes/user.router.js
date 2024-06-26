import express from "express";
import {
  getUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, getUsers);

export default router;
