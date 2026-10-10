import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { staffController } from "./staff.controller";

const router = Router();

router.get(
  "/assign/complaint",
  auth(Role.STAFF),
  staffController.myAssignComplaints,
);

router.get(
  "/assign/service-request",
  auth(Role.STAFF),
  staffController.myAssignServiceRequest,
);

router.get("/dashboard", auth(Role.STAFF), staffController.getDashboardData);

export const staffRoutes = router;
