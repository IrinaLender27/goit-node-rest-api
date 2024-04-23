import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import {
  register,
  login,
  getCurrent,
  logout,
} from "../controllers/authController.js";
import authenticate from "../helpers/authenticate.js";

const authRouter = express.Router();
// signup
authRouter.post("/register", validateBody(registerSchema), register);
// signin
authRouter.post("/login", validateBody(loginSchema), login);
//current
authRouter.get("/current", authenticate, getCurrent);
//logout
authRouter.post("/logout", authenticate, logout);

export default authRouter;
