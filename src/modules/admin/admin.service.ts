import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IAddStaff } from "./admin.interface";
import config from "../../config";
import { IQuery } from "../../interfaces";
import {
  ComplaintWhereInput,
  ServiceRequestWhereInput,
} from "../../../generated/prisma/models";
import {
  ComplaintStatus,
  ServiceStatus,
} from "../../../generated/prisma/enums";

const addNewStaff = async (payload: IAddStaff) => {
  const {
    name,
    email,
    categoryId,
    experienceYears,
    contactNumber,
    password,
    role,
  } = payload;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      staff: {
        create: {
          name,
          email,
          categoryId,
          experienceYears: Number(experienceYears),
          contactNumber,
        },
      },
    },
  });

  return result;
};

const getAllComplaint = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ComplaintWhereInput[] = [];

  //filtering
  if (query.status) {
    andConditions.push({
      status: query.status as ComplaintStatus,
      // status: { equals: query.status, mode: "insensitive" },
    });
  }

  const allComplaint = await prisma.complaint.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      staff: true,
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  const totalAllComplaint = await prisma.complaint.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allComplaint,
    meta: {
      page: page,
      limit: limit,
      total: totalAllComplaint,
      totalPages: Math.ceil(totalAllComplaint / limit),
    },
  };
};

const getAllServiceRequest = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ServiceRequestWhereInput[] = [];

  //filtering
  if (query.status) {
    andConditions.push({
      status: query.status as ServiceStatus,
      // status: { equals: query.status, mode: "insensitive" },
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
    include: {
      staff: true,
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  const totalAllServiceRequest = await prisma.serviceRequest.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allServiceRequest,
    meta: {
      page: page,
      limit: limit,
      total: totalAllServiceRequest,
      totalPages: Math.ceil(totalAllServiceRequest / limit),
    },
  };
};

export const adminService = {
  addNewStaff,
  getAllComplaint,
  getAllServiceRequest,
};
