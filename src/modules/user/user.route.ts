import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.patch(
  "/profile-image",
  auth(Role.ADMIN, Role.CITIZEN, Role.STAFF),
  upload.single("profileImage"),
  userController.uploadProfileImage,
);

export const userRoutes = router;
