import { Router } from "express";
import { signup, login, logout, refresh } from "./auth.controllers.js"
import { validate } from "../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { signUpSchema, loginSchema, refreshSchema, logoutSchema } from "./auth.validators.js";

const router = Router();
router.post("/signup", validate(signUpSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", authMiddleware, validate(logoutSchema), logout);

export default router;
