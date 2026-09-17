import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/add-new-staff", adminController.addNewStaff);
router.post("/all-complaint", adminController.addNewStaff); //hove to work

export const adminRoutes = router;
