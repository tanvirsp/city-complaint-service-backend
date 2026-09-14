import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { AppError } from "../../utils/AppErrors";

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "No File Provided.");
  }

  const userId = req.user?.id;

  const result = await userServices.uploadProfileImage(
    req.file?.buffer,
    userId!,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image Uploaded successfully",
    data: result,
  });
});

export const userController = {
  uploadProfileImage,
};
