import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import {
  IAddStaff,
  IComplaintAssignToStaff,
  IServiceRequestAssignToStaff,
  IUserStatusUpdate,
} from "./admin.interface";
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
  const { name, email, categoryId, experienceYears, contactNumber, password } =
    payload;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "STAFF",
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
      category: true,
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

const updateUserStatus = async (payload: IUserStatusUpdate) => {
  const { userId, status } = payload;
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      status: status,
    },
  });

  return result;
};

const allUsers = async () => {
  const result = await prisma.citizen.findMany({
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

const allStaff = async () => {
  const result = await prisma.staff.findMany({
    include: {
      category: true,
      user: {
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

const assignComplaintToStaff = async (payload: IComplaintAssignToStaff) => {
  const { complaintId, staffId } = payload;
  const result = await prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      staffId,
      status: "ASSIGNED",
    },
  });

  return result;
};

const assignServiceRequestToStaff = async (
  payload: IServiceRequestAssignToStaff,
) => {
  const { serviceRequestId, staffId } = payload;
  const result = await prisma.serviceRequest.update({
    where: {
      id: serviceRequestId,
    },
    data: {
      staffId,
      status: "ASSIGNED",
    },
    include: {
      payment: true,
      staff: true,
    },
  });

  return result;
};

const rejectComplaint = async (payload: {
  complaintId: string;
  rejectReason: string;
}) => {
  const { complaintId, rejectReason } = payload;
  const result = await prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      rejectReason,
      status: "REJECTED",
    },
  });

  return result;
};

const complaintDetails = async (complaintId: string) => {
  const result = await prisma.complaint.findFirst({
    where: {
      id: complaintId,
    },
    include: {
      staff: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });

  return result;
};

const detailsServiceRequest = async (serviceRequestId: string) => {
  const result = await prisma.serviceRequest.findFirst({
    where: {
      id: serviceRequestId,
    },
    include: {
      staff: true,
      service: true,
      payment: true,
    },
  });

  return result;
};

const getDashboardData = async () => {
  const totalUser = await prisma.citizen.count();
  const totalStaff = await prisma.staff.count();
  const totalServices = await prisma.service.count();
  const totalComplaint = await prisma.complaint.count();
  const totalServiceRequest = await prisma.serviceRequest.count();

  const totalPendingComplaintRequest = await prisma.complaint.count({
    where: {
      status: "PENDING",
    },
  });

  const totalPendingServiceRequest = await prisma.serviceRequest.count({
    where: {
      status: "PENDING",
    },
  });

  return {
    totalUser,
    totalStaff,
    totalServices,
    totalComplaint,
    totalServiceRequest,
    totalPendingComplaintRequest,
    totalPendingServiceRequest,
  };
};

export const adminService = {
  addNewStaff,
  getAllComplaint,
  getAllServiceRequest,
  updateUserStatus,
  allUsers,
  assignComplaintToStaff,
  assignServiceRequestToStaff,
  allStaff,
  rejectComplaint,
  complaintDetails,
  detailsServiceRequest,
  getDashboardData,
};
