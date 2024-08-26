import jwt from "jsonwebtoken";
export const isSameUserMiddleware = (req, res, next) => {
  try {
    const jwtToken = req.headers["jwttoken"];
    const userData = jwt.verify(jwtToken, process.env.JWT_SECRET_SALT);
    const userId = req.params.userId;
    if (userData.id === userId) {
      next();
    } else {
      throw new Error("User is not authorized to perform this action");
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
