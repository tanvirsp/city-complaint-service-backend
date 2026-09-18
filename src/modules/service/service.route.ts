import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/", auth(Role.ADMIN), serviceController.createService);
router.get("/", auth(Role.ADMIN), serviceController.serviceList);
router.patch("/", auth(Role.ADMIN), serviceController.upateService);

export const serviceRoutes = router;
