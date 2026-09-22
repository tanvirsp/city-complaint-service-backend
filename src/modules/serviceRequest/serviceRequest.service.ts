import { ServiceRequestWhereInput } from "../../../generated/prisma/models";
import { IQuery } from "../../interfaces";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppErrors";
import httpStatus from "http-status";
import {
  IServiceRequestCreate,
  IServiceRequestUpdate,
} from "./serviceRequest.interface";

const addServiceRequest = async (
  payload: IServiceRequestCreate,
  userId: string,
) => {
  const { serviceId, title, address, contactNumber } = payload;

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service Not Found");
  }

  const result = await prisma.serviceRequest.create({
    data: {
      title,
      address,
      contactNumber,
      serviceId,
      serviceFee: service.serviceFee,
      userId,
    },
  });

  return result;
};

const myServiceRequest = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ServiceRequestWhereInput[] = [{ userId: userId }];
  //Searching
  if (query.searchTerm) {
    andConditions.push({
      OR: [{ title: { contains: query.searchTerm, mode: "insensitive" } }],
    });
  }

  const allServiceRequest = await prisma.serviceRequest.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalMyServiceRequestCount = await prisma.serviceRequest.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allServiceRequest,
    meta: {
      page: page,
      limit: limit,
      total: totalMyServiceRequestCount,
      totalPages: Math.ceil(totalMyServiceRequestCount / limit),
    },
  };
};

const detailsServiceRequest = async (
  userId: string,
  serviceRequestId: string,
) => {
  const result = await prisma.serviceRequest.findFirst({
    where: {
      id: serviceRequestId,
      userId: userId,
    },
  });

  return result;
};

const updateServiceRequest = async (
  userId: string,
  payload: IServiceRequestUpdate,
) => {
  const { serviceRequestId, ...restData } = payload;
  const result = await prisma.serviceRequest.update({
    where: {
      id: serviceRequestId,
      userId: userId,
    },
    data: restData,
  });

  return result;
};

const deleteServiceRequest = async (
  userId: string,
  serviceRequestId: string,
) => {
  const data = await prisma.serviceRequest.findFirst({
    where: {
      id: serviceRequestId,
      userId: userId,
    },
  });

  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Sorry service request not found. Check service request Id.",
    );
  }

  if (data.status !== "PENDING") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Sorry you can not delete now, because it's on going.",
    );
  }

  const result = await prisma.serviceRequest.delete({
    where: {
      id: serviceRequestId,
      userId: userId,
    },
  });

  return result;
};

export const serviceRequestService = {
  addServiceRequest,
  myServiceRequest,
  detailsServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
};
