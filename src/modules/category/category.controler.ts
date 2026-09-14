import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await categoryService.createCategory(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category create successfully",
      data: result,
    });
  },
);

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.getCategories();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category retrieve successfully",
      data: result,
    });
  },
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const result = await categoryService.deleteCategory(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category delete successfully",
      data: result,
    });
  },
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await categoryService.updateCategory(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category delete successfully",
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
