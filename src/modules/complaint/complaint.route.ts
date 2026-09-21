import { Router } from "express";
import { complaintController } from "./complaint.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";
import { validateRequest } from "../../middlewares/validateRequest";
import { complaintValidation } from "./complaint.validation";

const router = Router();

router.post(
  "/add-complaint",
  auth(Role.CITIZEN),
  upload.single("complaintImage"),
  complaintController.addComplaint,
);

router.patch(
  "/update-complaint",
  auth(Role.CITIZEN),
  complaintController.updateComplaint, // working on
);

router.get(
  "/my-complaint",
  auth(Role.CITIZEN),
  complaintController.myComplaint,
);

router.get(
  "/complaint-details/:id",
  auth(Role.CITIZEN, Role.ADMIN, Role.STAFF),
  complaintController.complaintDetails,
);

router.patch(
  "/update-status",
  auth(Role.STAFF),
  validateRequest(complaintValidation.ComplaintUpdateZodSchema),
  complaintController.complaintUpdateStatus,
);

router.patch(
  "/complate",
  auth(Role.STAFF),
  upload.single("complaintImage"),
  complaintController.completeComplaint,
);

export const complaintRoutes = router;
