import bcrypt from "bcryptjs";
import Role from "../models/role.js";
import User from "../models/user.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
    roles: role,
  });

  await newUser.save();
  return res.status(201).send("User registered!");
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }
    res.status(200).send("Login successful!");
  } catch (error) {
    console.error(error);
  }
};
