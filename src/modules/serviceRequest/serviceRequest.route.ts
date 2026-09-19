import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceRequestController } from "./serviceRequest.controller";

const router = Router();

router.post(
  "/",
  auth(Role.CITIZEN),
  serviceRequestController.addServiceRequest,
);

export const serviceRequestRoutes = router;
