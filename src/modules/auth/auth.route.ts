import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/verify-email", authController.verifyCitizenEmail);

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/google", authController.googleLogin);

router.get(
  "/me",
  auth(Role.ADMIN, Role.CITIZEN, Role.STAFF),
  authController.getMyProfile,
);

router.patch(
  "/me",
  auth(Role.ADMIN, Role.CITIZEN, Role.STAFF),
  authController.updateProfile,
);

export const authRoutes = router;
