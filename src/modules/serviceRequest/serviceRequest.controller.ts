import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { serviceRequestService } from "./serviceRequest.service";

const addServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;

    const result = await serviceRequestService.addServiceRequest(
      payload,
      userId!,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "New service added successfully",
      data: result,
    });
  },
);

const myServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await serviceRequestService.myServiceRequest(
      userId!,
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All service retrieved successfully",
      data: result,
    });
  },
);

export const serviceRequestController = {
  addServiceRequest,
  myServiceRequest,
};
