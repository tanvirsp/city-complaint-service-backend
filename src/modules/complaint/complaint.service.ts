import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

import config from "../../config";

const addComplaint = async (payload: any) => {
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

export const complaintService = {
  addComplaint,
};
