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
