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

export const serviceRequestService = {
  addServiceRequest,
};
