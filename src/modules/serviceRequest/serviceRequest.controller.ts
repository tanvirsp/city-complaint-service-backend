import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { serviceRequestService } from "./serviceRequest.service";
import { AppError } from "../../utils/AppErrors";

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

const detailsServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const serviceRequestId = req.params.id as string;

    const result = await serviceRequestService.detailsServiceRequest(
      userId!,
      serviceRequestId,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Details service request retrieved successfully",
      data: result,
    });
  },
);

const updateServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;

    const result = await serviceRequestService.updateServiceRequest(
      userId!,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service request update successfully",
      data: result,
    });
  },
);

const deleteServiceRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const serviceRequestId = req.params.id as string;

    await serviceRequestService.deleteServiceRequest(userId!, serviceRequestId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service request delete successfully",
      data: null,
    });
  },
);
export const serviceRequestController = {
  addServiceRequest,
  myServiceRequest,
  detailsServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
};
