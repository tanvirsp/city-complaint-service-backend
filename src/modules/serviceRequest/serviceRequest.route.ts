import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceRequestController } from "./serviceRequest.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { serviceRequestValidation } from "./serviceRequest.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CITIZEN),
  validateRequest(serviceRequestValidation.ServiceRequestCreateZodSchema),
  serviceRequestController.addServiceRequest,
);

router.get(
  "/my",
  auth(Role.CITIZEN),
  serviceRequestController.myServiceRequest,
);

export const serviceRequestRoutes = router;
