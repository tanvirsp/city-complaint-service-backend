import { Router } from "express";
import { complaintController } from "./complaint.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";

const router = Router();

router.post("/add-service", auth(Role.ADMIN), serviceController);

export const serviceRoutes = router;
