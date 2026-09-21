import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { staffService } from "./staff.service";

const myAssignComplaints = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result = await staffService.myAssignComplaints(
      userId as string,
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Staff Complaints retrieved successfully",
      data: result,
    });
  },
);

const myAssignServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result = await staffService.myAssignServiceRequest(
      userId as string,
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Staff Complaints retrieved successfully",
      data: result,
    });
  },
);

export const staffController = {
  myAssignComplaints,
  myAssignServiceRequest,
};
