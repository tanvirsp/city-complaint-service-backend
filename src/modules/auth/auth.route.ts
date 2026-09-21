import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation.CitizenRegistrationZodSchema),
  authController.registerUser,
);
router.post(
  "/verify-email",
  validateRequest(userValidation.CitizenEmailVerifyZodSchema),
  authController.verifyCitizenEmail,
);

router.post(
  "/login",
  validateRequest(userValidation.LoginZodSchema),
  authController.loginUser,
);
router.post("/refresh-token", authController.refreshToken);
router.post("/google", authController.googleLogin);
router.post(
  "/forget-password",
  validateRequest(userValidation.ForgotPasswordZodSchema),
  authController.forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(userValidation.ResetPasswordZodSchema),
  authController.resetPassword,
);

export const authRoutes = router;
