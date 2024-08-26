import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const userDetails = req.body;
    if (!userDetails.email || !userDetails.password) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter email and password" });
    }
    const user = await User.findOne({ email: userDetails.email }).select(
      "password email"
    );
    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(userDetails.password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid Credentials" });
    } else {
      const jwtToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET_SALT,
        {
          expiresIn: "1d",
        }
      );
      res.setHeader("jwtToken", jwtToken);
      return res.status(200).send({
        status: true,
        message: "Login Successful",
        jwttoken: jwtToken,
      });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err });
  }
};
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    //check if user already exists
    const exist = await User.findOne({ email: userData.email });
    if (exist) {
      return res
        .status(400)
        .send({ status: false, message: "User already exists" });
    }
    const user = await User.create(userData);
    res.status(200).send({ status: true, userData: userData });
  } catch (err) {
    res.status(401).send({ status: false, messsage: err.message });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const userData = req.user;
    const userInfo = await User.findById(userData.id);
    console.log(userInfo);
    res.status(200).send({ status: true, userData: userInfo });
  } catch (err) {
    res.status(401).send({ status: false, message: err });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Error getting users", err);
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(req.body);
    const user = await User.findByIdAndUpdate(userId, req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error updating user", err);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user", err);
  }
};
