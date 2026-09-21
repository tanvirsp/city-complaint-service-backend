import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { complaintService } from "./complaint.service";
import { AppError } from "../../utils/AppErrors";

const addComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = JSON.parse(req.body.data);

    const user = req.user!;

    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, "No Image Provided.");
    }

    const result = await complaintService.addComplaint(
      payload,
      user,
      req.file?.buffer,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "New complaint added successfully",
      data: result,
    });
  },
);

const myComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id!;

    const result = await complaintService.myComplaint(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "My all complaint retrieved successfully",
      data: result,
    });
  },
);

const complaintDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const complaintId = req.params.id;

    const result = await complaintService.complaintDetails(
      complaintId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Complaint details retrieved successfully",
      data: result,
    });
  },
);

const complaintUpdateStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await complaintService.complaintUpdateStatus(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Complaint status update successfully",
      data: result,
    });
  },
);

const completeComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = JSON.parse(req.body.data);

    // const user = req.user!;

    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, "No Image Provided.");
    }

    const result = await complaintService.completeComplaint(
      payload,
      req.file?.buffer,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Complaint is completed successfully",
      data: result,
    });
  },
);

const updateComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const useerId = req.user?.id;

    const result = await complaintService.updateComplaint(
      payload,
      useerId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Complaint update successfully",
      data: result,
    });
  },
);

export const complaintController = {
  addComplaint,
  myComplaint,
  complaintDetails,
  complaintUpdateStatus,
  completeComplaint,
  updateComplaint,
};
