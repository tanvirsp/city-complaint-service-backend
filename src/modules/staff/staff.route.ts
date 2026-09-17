import { Router } from "express";
import { staffController } from "./staff.controller";

const router = Router();

router.get("/apply-as-staff", staffController.applyAsStaff);

export const staffRoutes = router;
