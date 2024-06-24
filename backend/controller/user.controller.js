import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userexists = await User.findOne({ email });
    if (userexists) {
      let err = new Error(`User with email ${email} already exists!`);
      err.status = 400;
      throw err;
    }
    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);
    let user = await User.create(req.body);
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

export { signup };
