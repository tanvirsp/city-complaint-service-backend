import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth(Role.CITIZEN), paymentController.createPayment);
router.post("/success", paymentController.paymentSuccess);
router.post("/fail", paymentController.paymentFail);
router.post("/cancel", paymentController.paymentCancel);

// router.get("/", paymentController.paymentHistory);
// router.get(
//   "/:id",
//   auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),
//   paymentController.paymentDetails,
// );

export const paymentRoutes = router;
