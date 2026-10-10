import axios from "axios";
import config from "../../config";
import {
  SSLCommerzPaymentFailResponse,
  SSLCommerzSuccessPayload,
} from "./payment.interface";
import { prisma } from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import {
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import { IQuery } from "../../interfaces";
import { PaymentWhereInput } from "../../../generated/prisma/models";

const initiatePayment = async (serviceRequestId: string, user: JwtPayload) => {
  const previousPaymentRecord = await prisma.payment.findUnique({
    where: {
      serviceRequestId,
    },
  });

  let totalAmount;
  let tran_id;

  if (previousPaymentRecord && previousPaymentRecord?.status == "PAID") {
    throw new Error("Sorry you alrady paid for this service");
  }

  if (previousPaymentRecord) {
    totalAmount = Number(previousPaymentRecord.amount);
    tran_id = previousPaymentRecord.transactionId;
  } else {
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

    totalAmount = Number(service.serviceFee);
    tran_id = `TAN${Math.floor(1000000 + Math.random() * 9000000)}`;

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
  }

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

const paymentHistory = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: PaymentWhereInput[] = [{ userId: userId }];

  //Searching
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        { transactionId: { contains: query.searchTerm, mode: "insensitive" } },
      ],
    });
  }

  //filtering
  if (query.status) {
    andConditions.push({
      status: query.status as PaymentStatus,
    });
  }

  const allPayment = await prisma.payment.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      serviceRequest: true,
    },
  });

  const totalMyPaymentCount = await prisma.payment.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allPayment,
    meta: {
      page: page,
      limit: limit,
      total: totalMyPaymentCount,
      totalPages: Math.ceil(totalMyPaymentCount / limit),
    },
  };
};

const paymentDetails = async (paymentId: string) => {
  const result = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      serviceRequest: true,
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
