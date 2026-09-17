import { Router } from "express";
import { complaintController } from "./complaint.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";

const router = Router();

router.post(
  "/add-complaint",
  auth(Role.CITIZEN),
  upload.single("complaintImage"),
  complaintController.addComplaint,
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
  complaintController.complaintUpdateStatus,
);

router.patch(
  "/complate",
  auth(Role.STAFF),
  complaintController.completeComplaint,
);

export const complaintRoutes = router;
