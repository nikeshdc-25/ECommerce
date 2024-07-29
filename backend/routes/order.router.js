import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrders,
} from "../controller/order.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.post("/addorder", checkAuth, addOrder);
router.get("/:id", checkAuth, getOrderById);

export default router;
