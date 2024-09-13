import bcryptjs from "bcrypt";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, name, avatarURL } = req.body;

  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Plese fill all the data" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password by bcrypt
    const hashPassword = await bcryptjs.hash(password, 10);

    //verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 9000000
    ).toString();

    //create new user
    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    //saving the user
    await user.save();

    //   jwt token
    generateTokenAndSetCookie(res, user._id);
    
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user.doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }

  res.send("We are on signup route");
};



export const login = async (req, res) => {
  res.send("We are on login route");
};

export const logout = async (req, res) => {
  res.send("We are on logout route");
};
