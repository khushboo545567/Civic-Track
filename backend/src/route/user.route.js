import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccount,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getCurrentUser);
router.route("/refreshToken").get(verifyJWT, refreshAccessToken);
router.route("/change_password").post(verifyJWT, changePassword);
router.route("/update_profile").post(verifyJWT, updateAccount);
export default router;
