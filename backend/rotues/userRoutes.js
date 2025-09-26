import express from "express";
import {
    deleteUser,
  forgotPassword,
  getAllUsers,
  getUserDetails,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);

router.route("/admin/users").get(isAuthenticated, authorizeRoles('admin'), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticated, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteUser);

export default router;
