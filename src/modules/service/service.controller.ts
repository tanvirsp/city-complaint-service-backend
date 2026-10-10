import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppErrors";
import { serviceService } from "./service.service";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await serviceService.createService(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "New service added successfully",
      data: result,
    });
  },
);

const serviceList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.serviceList();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All service retrieved successfully",
      data: result,
    });
  },
);

const upateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await serviceService.updateService(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service update successfully",
      data: result,
    });
  },
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.body.serviceId;
    const result = await serviceService.deleteService(serviceId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service update successfully",
      data: result,
    });
  },
);

const serviceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params?.serviceId;

    const result = await serviceService.serviceById(serviceId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Get Service details successfully",
      data: result,
    });
  },
);

export const serviceController = {
  createService,
  serviceList,
  upateService,
  deleteService,
  serviceById,
};
