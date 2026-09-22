import { Router } from "express";
import { categoryController } from "./category.controler";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(categoryValidation.CreateZodSchema),
  categoryController.createCategory,
);
router.get("/", categoryController.getCategories);
router.delete(
  "/",
  auth(Role.ADMIN),
  validateRequest(categoryValidation.DeleteZodSchema),
  categoryController.deleteCategory,
);
router.patch(
  "/",
  auth(Role.ADMIN),
  validateRequest(categoryValidation.UpdateZodSchema),
  categoryController.updateCategory,
);

export const categoryRoutes = router;
