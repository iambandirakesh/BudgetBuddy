import User from "../models/user.model.js";
export const isAdminOrSameUserMiddleware = async (req, res, next) => {
  const userData = req.user;
  const userInfo = await User.findById(userData.id);
  if (userInfo.isAdmin || userData.id === req.params.userId) {
    next();
  } else {
    res.status(401).send({
      status: false,
      message: "You are not authorized to perform this action",
    });
  }
};
