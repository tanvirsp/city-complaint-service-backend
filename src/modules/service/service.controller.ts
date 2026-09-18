import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppErrors";

const addService = catchAsync(
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

export const serviceController = {
  addService,
};
