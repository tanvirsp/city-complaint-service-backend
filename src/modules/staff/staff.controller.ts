import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { staffService } from "./staff.service";

const applyAsStaff = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const resume = files?.["resume"] ? files["resume"][0] : null;
    const additionalFiles = files?.["additionalFiles"] || [];

    const payload = req.body.data;

    const result = await staffService.applyAsStaff(
      payload,
      resume!,
      additionalFiles,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Staff registered successfully",
      data: result,
    });
  },
);

export const staffController = {
  applyAsStaff,
};
