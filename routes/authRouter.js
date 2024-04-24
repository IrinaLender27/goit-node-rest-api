import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} from "../controllers/authController.js";
import authenticate from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();
// signup
authRouter.post("/register", validateBody(registerSchema), register);
// signin
authRouter.post("/login", validateBody(loginSchema), login);
//current
authRouter.get("/current", authenticate, getCurrent);
//logout
authRouter.post("/logout", authenticate, logout);
// avatar
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);
export default authRouter;
