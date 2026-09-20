import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IAddStaff } from "./admin.interface";
import config from "../../config";
import { IQuery } from "../../interfaces";

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

  const allComplaint = await prisma.complaint.findMany({
    where: {},
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

  const totalAllComplaint = await prisma.complaint.count({});

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

export const adminService = {
  addNewStaff,
  getAllComplaint,
};
