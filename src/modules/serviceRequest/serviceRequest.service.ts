import { ServiceRequestWhereInput } from "../../../generated/prisma/models";
import { IQuery } from "../../interfaces";
import { prisma } from "../../lib/prisma";
import { IServiceRequestCreate } from "./serviceRequest.interface";

const addServiceRequest = async (
  payload: IServiceRequestCreate,
  userId: string,
) => {
  const result = await prisma.serviceRequest.create({
    data: {
      ...payload,
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

export const serviceRequestService = {
  addServiceRequest,
  myServiceRequest,
};
