import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashPassword,
    role: role || "user",
  });
  await user.save();
  res.status(201).json({ msg: "User registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid Credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token, role: user.role });
};
