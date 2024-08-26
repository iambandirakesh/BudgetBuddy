import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const isAdminMiddleware = async (req, res, next) => {
  try {
    const userData = req.user;
    const userDetails = await User.findById(userData.id);
    if (!userDetails.isAdmin) {
      return res.status(401).send({
        status: false,
        message: "You are not authorized to perform this action",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
