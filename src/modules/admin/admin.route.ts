import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/add-new-staff", adminController.addNewStaff);
router.get("/all-complaint", adminController.getAllComplaint);
router.get("/all-service-request", adminController.addNewStaff); //hove to work
router.patch("/udate-user-status", adminController.addNewStaff); //hove to work

export const adminRoutes = router;
