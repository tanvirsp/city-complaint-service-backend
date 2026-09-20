import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const addNewStaff = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await adminService.addNewStaff(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "New staff added successfully",
      data: result,
    });
  },
);

const getAllComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllComplaint(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All complaint retrieved successfully",
      data: result,
    });
  },
);

export const adminController = {
  addNewStaff,
  getAllComplaint,
};
