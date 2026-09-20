import axios from "axios";
import config from "../../config";
import {
  SSLCommerzPaymentFailResponse,
  SSLCommerzSuccessPayload,
} from "./payment.interface";
import { prisma } from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { PaymentProvider } from "../../../generated/prisma/enums";

const initiatePayment = async (serviceRequestId: string, user: JwtPayload) => {
  //Find Service Request

  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: {
      id: serviceRequestId,
    },
  });

  if (!serviceRequest) {
    throw new Error("Sorry this service reques is not found");
  }

  //Find Serfice
  const service = await prisma.service.findUnique({
    where: {
      id: serviceRequest.serviceId,
    },
  });

  if (!service) {
    throw new Error("Sorry that service is not available");
  }

  const totalAmount = Number(service.serviceFee);

  const tran_id = `TAN${Math.floor(1000000 + Math.random() * 9000000)}`;

  //Create Payment data
  await prisma.payment.create({
    data: {
      serviceRequestId,
      userId: user.id,
      amount: totalAmount,
      provider: PaymentProvider.SSLCOMMERZ,
      transactionId: tran_id,
    },
  });

  //SSC Commerz Data
  const storeData = {
    store_id: config.ssl_commerz_store_id,
    store_passwd: config.ssl_commerz_store_password,
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${config.app_url}/api/v1/payment/success`,
    fail_url: `${config.app_url}/api/v1/payment/fail`,
    cancel_url: `${config.app_url}/api/v1/payment/cancel`,
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: "N/A",
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    storeData,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  const data = await response.data;
  return data.GatewayPageURL;
};

const paymentSuccess = async (payload: SSLCommerzSuccessPayload) => {
  const { val_id, tran_id, amount, card_type } = payload;

  //Verify Payment
  const url =
    "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";

  const response = await axios.get(
    `${url}?val_id=${val_id}&store_id=${config.ssl_commerz_store_id}&store_passwd=${config.ssl_commerz_store_password}&format=json`,
  );

  const veriryData = response.data;

  if (veriryData.status !== "VALID") {
    throw new Error("Payment validation failed");
  }

  const paymentData = await prisma.payment.findUnique({
    where: { transactionId: tran_id },
  });

  if (!paymentData) {
    throw new Error("Transition Id is not Matching with payment");
  }

  if (Number(amount) !== Number(paymentData.amount)) {
    throw new Error("Amount mismatch");
  }

  const updatePayment = await prisma.payment.update({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: "PAID",
      valId: val_id,
      paidAt: new Date(),
      paymentMethod: card_type,
    },
  });
  return updatePayment;
};

const paymentFail = async (payload: SSLCommerzPaymentFailResponse) => {
  const { tran_id, card_issuer } = payload;
  //update payment status
  await prisma.payment.update({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: "FAILED",
      paymentMethod: card_issuer,
    },
  });
};

const paymentHistory = async (userId: string) => {
  const result = await prisma.payment.findMany({
    where: { userId },
  });

  return result;
};

const paymentDetails = async (paymentId: string) => {
  const result = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      serviceRequest: true,
      staff: {
        select: {
          name: true,
          address: true,
          contactNumber: true,
        },
      },
    },
  });

  return result;
};

export const paymentService = {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentHistory,
  paymentDetails,
};
