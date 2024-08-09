import express from "express";
import {
  addProduct,
  addUserReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.get("/topproducts", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);

router.put("/:id/addreview", checkAuth, addUserReview);
//router.put("/:id",  upload.single("image"), updateProduct)
export default router;
