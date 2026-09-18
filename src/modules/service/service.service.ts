import { prisma } from "../../lib/prisma";
import { IServiceCreate } from "./service.interface";

const createService = async (payload: IServiceCreate) => {
  const result = await prisma.service.create({
    data: payload,
  });

  return result;
};

const serviceList = async () => {
  const result = await prisma.service.findMany({});
  return result;
};

const updateService = async (payload: any) => {
  const { serviceId, name, serviceFee } = payload;
  const result = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      name,
      serviceFee,
    },
  });

  return result;
};

export const serviceService = {
  createService,
  serviceList,
  updateService,
};
