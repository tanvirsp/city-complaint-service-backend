import { prisma } from "../../lib/prisma";
import { IServiceCreate } from "./service.interface";

const createService = async (payload: IServiceCreate) => {
  console.log(payload);
  const result = await prisma.service.create({
    data: payload,
  });

  return result;
};

const serviceList = async () => {
  const result = await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
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

const deleteService = async (serviceId: string) => {
  const result = await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return result;
};

const serviceById = async (serviceId: string) => {
  const result = await prisma.service.findFirst({
    where: {
      id: serviceId,
    },
  });

  return result;
};

export const serviceService = {
  createService,
  serviceList,
  updateService,
  deleteService,
  serviceById,
};
