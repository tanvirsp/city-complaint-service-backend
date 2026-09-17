import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/add-new-staff", adminController.addNewStaff);

export const adminRoutes = router;
