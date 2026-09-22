import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { paymentValidation } from "./payment.validation";

const router = Router();

router.post(
  "/create",
  auth(Role.CITIZEN),
  validateRequest(paymentValidation.PaymentCreateZodSchema),
  paymentController.createPayment,
);
router.post("/success", paymentController.paymentSuccess);
router.post("/fail", paymentController.paymentFail);
router.post("/cancel", paymentController.paymentCancel);

router.get("/my", auth(Role.CITIZEN), paymentController.paymentHistory);
router.get(
  "/:id",
  auth(Role.CITIZEN, Role.ADMIN),
  paymentController.paymentDetails,
);

export const paymentRoutes = router;
