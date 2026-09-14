import { Router } from "express";
import { categoryController } from "./category.controler";

const router = Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.delete("/", categoryController.deleteCategory);
router.patch("/", categoryController.updateCategory);

export const categoryRoutes = router;
