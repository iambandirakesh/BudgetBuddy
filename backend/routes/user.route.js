import express from "express";
import {
  login,
  createUser,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { AuthMddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";
import { isSameUserMiddleware } from "../middleware/isSameUser.middleware.js";
import { isAdminOrSameUserMiddleware } from "../middleware/isAdminOrSameUser.midddleware.js";
const router = express.Router();
//login
router.post("/login", login);
//add user
router.post("/", createUser);
//get user
router.get("/", AuthMddleware, getUserDetails);
//get user by Id
router.get("/:userId", AuthMddleware, isAdminMiddleware, getUserDetails);
//getAllUsers
router.get("/all", AuthMddleware, isAdminMiddleware, getUserDetails);
//upate user
router.put("/:userId", AuthMddleware, isAdminOrSameUserMiddleware, updateUser);
//delete user
router.delete("/:userId", AuthMddleware, isAdminMiddleware, deleteUser);
export default router;
