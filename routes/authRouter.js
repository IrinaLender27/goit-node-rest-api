import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import { register, login } from "../controllers/authController.js";

const authRouter = express.Router();
// signup
authRouter.post("/register", validateBody(registerSchema), register);
// signin
authRouter.post("/login", validateBody(loginSchema), login);

export default authRouter;
