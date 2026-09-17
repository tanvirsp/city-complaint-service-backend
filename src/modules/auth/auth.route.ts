import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/verify-email", authController.verifyCitizenEmail);

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/google", authController.googleLogin);
router.post("/forget-password", authController.forgetPassword);

router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
