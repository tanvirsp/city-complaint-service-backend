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

router.get(
  "/details/:id",
  auth(Role.CITIZEN, Role.STAFF, Role.ADMIN),
  serviceRequestController.detailsServiceRequest,
);

router.patch(
  "/",
  auth(Role.CITIZEN, Role.STAFF, Role.ADMIN),
  validateRequest(serviceRequestValidation.ServiceRequestUpdateZodSchema),
  serviceRequestController.updateServiceRequest,
);

router.delete(
  "/:id",
  auth(Role.CITIZEN),
  serviceRequestController.deleteServiceRequest,
);

export const serviceRequestRoutes = router;
