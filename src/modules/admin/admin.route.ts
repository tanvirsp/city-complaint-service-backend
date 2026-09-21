import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

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

router.patch(
  "/complaint/assign-staff",
  auth(Role.ADMIN),
  validateRequest(adminValidation.ComplaintAssignToStaffZodSchema),
  adminController.assignComplaintToStaff,
);

router.patch(
  "/service-request/assign-staff",
  auth(Role.ADMIN),
  validateRequest(adminValidation.ServiceAssignToStaffZodSchema),
  adminController.assignServiceRequestToStaff,
);

export const adminRoutes = router;
