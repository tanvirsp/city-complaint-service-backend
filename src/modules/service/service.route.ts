import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceController } from "./service.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { serviceValidation } from "./service.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(serviceValidation.ServiceCreateZodSchema),
  serviceController.createService,
);
router.get("/", auth(Role.ADMIN), serviceController.serviceList);
router.patch(
  "/",
  auth(Role.ADMIN),
  validateRequest(serviceValidation.ServiceUpdateZodSchema),
  serviceController.upateService,
);

export const serviceRoutes = router;
