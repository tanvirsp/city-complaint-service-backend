import { Priority } from "../../../generated/prisma/enums";
import {
  ComplaintWhereInput,
  ServiceRequestWhereInput,
  StaffWhereInput,
} from "../../../generated/prisma/models";
import { IQuery } from "../../interfaces";
import { prisma } from "../../lib/prisma";

const myAssignComplaints = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ComplaintWhereInput[] = [{ staff: { userId: userId } }];

  //Searching
  if (query.searchTerm) {
    andConditions.push({
      OR: [{ title: { contains: query.searchTerm, mode: "insensitive" } }],
    });
  }

  //filtering
  if (query.priority) {
    andConditions.push({
      priority: query.priority as Priority,
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
      user: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  const totalMyComplaintCount = await prisma.complaint.count({
    where: {
      staff: {
        userId,
      },
    },
  });

  return {
    data: allComplaint,
    meta: {
      page: page,
      limit: limit,
      total: totalMyComplaintCount,
      totalPages: Math.ceil(totalMyComplaintCount / limit),
    },
  };
};

const myAssignServiceRequest = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const allServiceRequest = await prisma.serviceRequest.findMany({
    where: {
      staff: {
        userId,
      },
    },
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  const totalMyallServiceRequest = await prisma.serviceRequest.count({
    where: {
      staff: {
        userId,
      },
    },
  });

  return {
    data: allServiceRequest,
    meta: {
      page: page,
      limit: limit,
      total: totalMyallServiceRequest,
      totalPages: Math.ceil(totalMyallServiceRequest / limit),
    },
  };
};
const getDashboardData = async (userId: string) => {
  const totalAssignComplaint = await prisma.complaint.count({
    where: {
      staff: { userId: userId },
      status: "ASSIGNED",
    },
  });

  const totalAssignService = await prisma.serviceRequest.count({
    where: {
      staff: { userId: userId },
      status: "ASSIGNED",
    },
  });

  const totalCompleteAssignComplaint = await prisma.complaint.count({
    where: {
      staff: { userId: userId },
      status: "RESOLVED",
    },
  });

  const totalCompleteAssignService = await prisma.serviceRequest.count({
    where: {
      staff: { userId: userId },
      status: "RESOLVED",
    },
  });

  return {
    totalAssignComplaint,
    totalAssignService,
    totalCompleteAssignComplaint,
    totalCompleteAssignService,
  };
};

export const staffService = {
  myAssignComplaints,
  myAssignServiceRequest,
  getDashboardData,
};
