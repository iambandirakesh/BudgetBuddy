import jwt from "jsonwebtoken";
export const AuthMddleware = (req, res, next) => {
  try {
    const jwtToken = req.headers["jwttoken"];
    const userData = jwt.verify(jwtToken, process.env.JWT_SECRET_SALT);
    if (userData) {
      req.user = userData;
      next();
    } else {
      throw new Error("User token is invalid");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
