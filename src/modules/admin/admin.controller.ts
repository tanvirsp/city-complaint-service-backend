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

const getAllServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllServiceRequest(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All service request retrieved successfully",
      data: result,
    });
  },
);

const allUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await adminService.allUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user retrieved successfully",
      data: result,
    });
  },
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await adminService.updateUserStatus(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User status updated successfully",
      data: result,
    });
  },
);

const assignComplaintToStaff = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await adminService.assignComplaintToStaff(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Assign staff to complaint successfully",
      data: result,
    });
  },
);

const assignServiceRequestToStaff = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await adminService.assignServiceRequestToStaff(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Assign staff to service request successfully",
      data: result,
    });
  },
);

export const adminController = {
  addNewStaff,
  getAllComplaint,
  getAllServiceRequest,
  allUsers,
  updateUserStatus,
  assignComplaintToStaff,
  assignServiceRequestToStaff,
};
