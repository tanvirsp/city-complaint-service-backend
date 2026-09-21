import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/add-new-staff", auth(Role.ADMIN), adminController.addNewStaff);
router.get("/all-complaint", auth(Role.ADMIN), adminController.getAllComplaint);
router.get(
  "/all-service-request",
  auth(Role.ADMIN),
  adminController.getAllServiceRequest,
);

router.get("/users", auth(Role.ADMIN), adminController.allUsers);
router.patch(
  "/user/update-status",
  auth(Role.ADMIN),
  adminController.updateUserStatus,
);

export const adminRoutes = router;
