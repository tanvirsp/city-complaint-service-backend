import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { complaintService } from "./complaint.service";

const addComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await complaintService.addComplaint(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "New complaint added successfully",
      data: result,
    });
  },
);

export const complaintController = {
  addComplaint,
};
