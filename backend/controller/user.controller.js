import User from "../models/user.model.js";
import createToken from "../utils/token.util.js";

const signup = async (req, res, next) => {
  try {
    let { email, password } = req.body;
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
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      let err = new Error(`${email} not registered!`);
      err.status = 400;
      throw err;
    }
    if (await user.matchPassword(password)) {
      createToken(res, user._id);
      res.send({ message: "Login Success!" });
    } else {
      let err = new Error("Invalid Password!");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

export { signup, login };
