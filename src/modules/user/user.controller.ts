import type { NextFunction, Request, Response } from "express";
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

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await userServices.getMyProfile(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile get successfully",
      data: result,
    });
  },
);

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const result = await userServices.updateProfile(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile update successfully",
      data: result,
    });
  },
);

export const userController = {
  uploadProfileImage,
  updateProfile,
  getMyProfile,
};
