import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { JwtPayload } from "jsonwebtoken";

const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceRequestId = req.body.serviceRequestId;

    if (!serviceRequestId) {
      throw new Error("Service Request Id is required");
    }

    const user = req.user as JwtPayload;

    const result = await paymentService.initiatePayment(serviceRequestId, user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment submit successfully",
      data: result,
    });
  },
);

const paymentSuccess = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await paymentService.paymentSuccess(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment Verify successfully",
      data: {},
    });

    // return res.redirect(
    //   `https://rent-nest-frontend-d9fl.vercel.app/payment/success?paymentId=${payment.id}`,
    // );
  },
);

const paymentFail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await paymentService.paymentFail(req.body);

    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Payment Fail",
      data: "",
    });
  },
);

const paymentCancel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Your payment has been cancel",
      data: "",
    });
    // return res.redirect(
    //   `https://rent-nest-frontend-d9fl.vercel.app/payment/cancel`,
    // );
  },
);

const paymentHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await paymentService.paymentHistory(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment history retrieved successfully",
      data: result,
    });
  },
);

const paymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.id as string;

    if (!paymentId) {
      throw new Error("Payment Id is required");
    }
    const result = await paymentService.paymentDetails(paymentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment details retrieved successfully",
      data: result,
    });
  },
);

export const paymentController = {
  createPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentHistory,
  paymentDetails,
};
