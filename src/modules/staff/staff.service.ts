import { IQuery } from "../../interfaces";
import { prisma } from "../../lib/prisma";

const myAssignComplaints = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const allComplaint = await prisma.complaint.findMany({
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

export const staffService = {
  myAssignComplaints,
  myAssignServiceRequest,
};
