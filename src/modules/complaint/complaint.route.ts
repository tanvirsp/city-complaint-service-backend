import { Router } from "express";
import { complaintController } from "./complaint.controller";

const router = Router();

router.post("/add-complaint", complaintController.addComplaint);

export const complaintRoutes = router;
