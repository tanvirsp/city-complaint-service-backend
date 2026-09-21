import { Router } from "express";
import { categoryController } from "./category.controler";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";

const router = Router();

router.post(
  "/",
  validateRequest(categoryValidation.CreateZodSchema),
  categoryController.createCategory,
);
router.get("/", categoryController.getCategories);
router.delete(
  "/",
  validateRequest(categoryValidation.DeleteZodSchema),
  categoryController.deleteCategory,
);
router.patch(
  "/",
  validateRequest(categoryValidation.UpdateZodSchema),
  categoryController.updateCategory,
);

export const categoryRoutes = router;
