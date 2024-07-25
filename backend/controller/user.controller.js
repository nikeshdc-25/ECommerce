import User from "../models/user.model.js";
import createToken from "../utils/token.util.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";
import { isEmail, isStrongPassword } from "../utils/validator.js";

// @desc register new user
// @route /api/v1/users/signup
// @access public
const signup = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!isEmail(email)) {
    throw new ApiError(400, "Invalid Email!");
  }
  if (!isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Password must have atealst 1 uppercase, 1 lowercase, 1 digit and 1 special character!"
    );
  }
  let userexists = await User.findOne({ email });
  if (userexists) {
    let err = new Error(`User with email ${email} already exists!`);
    err.status = 400;
    throw err;
  }

  let user = await User.create(req.body);
  createToken(res, user._id);
  res.send({
    message: "User registered!",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

// @desc login user
// @route /api/v1/users/login
// @access public
const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    let err = new Error(`${email} not registered!`);
    err.status = 400;
    throw err;
  }
  if (await user.matchPassword(password)) {
    createToken(res, user._id);
    res.send({
      message: "Login Success!",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    let err = new Error("Invalid Password!");
    err.status = 400;
    throw err;
  }
});

// @desc logout user
// @route /api/v1/users/logout
// @access private
const logout = asyncHandler((req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout Success!" });
});

// @desc get all users
// @route /api/v1/users
// @access private + admin user
const getUsers = asyncHandler(async (req, res) => {
  let users = await User.find({}).select("-password");
  res.send(users);
});

// @desc get user profile
// @route /api/v1/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

// @desc udpate user profile
// @route /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  let id = req.user._id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    let updatedUser = await user.save();
    res.send({ message: "User updated", user: updatedUser });
  } else {
    throw new ApiError(404, "User not found!");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    let updatedUser = await user.save();
    res.send({ message: "User updated!", user: updatedUser });
  } else {
    throw new ApiError(404, "User not found!");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user.isAdmin) {
    throw new ApiError(400, "Cannot delete an admin user!");
  }
  await User.findByIdAndDelete(id);
  res.send({ message: "User deleted successfully!" });
});

export {
  signup,
  login,
  logout,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
