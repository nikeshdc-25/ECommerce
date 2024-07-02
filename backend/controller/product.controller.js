import asyncHandler from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";

// @desc get all products
// @route /api/v1/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// @desc get product by id
// @route /api/v1/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }
  res.send(product);
});

// @desc add new product
// @route /api/v1/products
// @access private/admin
const addProduct = asyncHandler(async (req, res) => {
  let product = await Product.create({ ...req.body, user: req.user._id });
  res.send({ message: "Product created successfully!", product });
});

// @desc update product
// @route /api/v1/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.image = req.body.image || product.image;
  product.brand = req.body.brand || product.brand;
  product.price = req.body.price || product.price;
  product.countInStock = req.body.countInStock || product.countInStock;
  let updateProduct = await product.save();

  res.send({ message: "Product updated successfully", product: updateProduct });
});

// @desc delete product
// @route /api/v1/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }
  await Product.findByIdAndDelete(id);
  res.send({ message: "Product deleted successfully" });
});

// @desc get top rated product
// @route /api/v1/products/topproducts/:limit
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  let limit = Number(req.params.limit);
  let products = await Product.find({}).sort({ rating: -1 }).limit(limit);
  res.send(products);
});

const addUserReview = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }
  let alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) throw new ApiError(400, "Already Reviewed!");

  let { rating, comment } = req.body;

  product.reviews.push({
    name: req.user.name,
    rating,
    comment,
    user: req.user._id,
  });
  product.numReviews = product.reviews.length;
  let totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  product.rating = (totalRating / product.reviews.length).toFixed(2);
  await product.save();
  res.send({ message: "Review added successfully!" });
});

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  addUserReview,
};
