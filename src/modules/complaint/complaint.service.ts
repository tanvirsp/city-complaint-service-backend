import { UploadApiResponse } from "cloudinary";
import { prisma } from "../../lib/prisma";
import { cloudinary } from "../../lib/cloudinary";
import { IRequestUser } from "../../middlewares/auth";
import httpStatus from "http-status";
import {
  IComplainCreate,
  IComplainUpdate,
  IStatusUpdate,
} from "./complaint.interface";
import { IQuery } from "../../interfaces";
import { ComplaintWhereInput } from "../../../generated/prisma/models";
import { AppError } from "../../utils/AppErrors";

const addComplaint = async (
  payload: IComplainCreate,
  user: IRequestUser,
  buffer: Buffer,
) => {
  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(new Error("No result returned from Cloudinary"));
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  const result = await prisma.complaint.create({
    data: {
      ...payload,
      userId: user.id,
      beforeImageUrl: cloudinaryResult.secure_url,
      beforeImagePublicId: cloudinaryResult.public_id,
    },
  });

  return result;
};

const myComplaint = async (userId: string, query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const andConditions: ComplaintWhereInput[] = [{ userId: userId }];

  //Searching
  if (query.searchTerm) {
    andConditions.push({
      OR: [{ title: { contains: query.searchTerm, mode: "insensitive" } }],
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
    },
  });

  const totalMyComplaintCount = await prisma.complaint.count({
    where: {
      AND: andConditions,
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
    },
  });

  return result;
};

const complaintUpdateStatus = async (payload: IStatusUpdate) => {
  const { id, status } = payload;
  const result = await prisma.complaint.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return result;
};

const completeComplaint = async (payload: any, buffer: Buffer) => {
  const { complaintId, status, rejectReason } = payload;

  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(new Error("No result returned from Cloudinary"));
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  const updateComplaint = prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      status,
      afterImageUrl: cloudinaryResult.secure_url,
      afterImagePublicId: cloudinaryResult.public_id,
      rejectReason: rejectReason ? rejectReason : "",
    },
  });

  return updateComplaint;
};

const updateComplaint = async (payload: IComplainUpdate, userId: string) => {
  const { id, ...restData } = payload;
  const ownRecord = await prisma.complaint.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!ownRecord) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This is not your complaint check Id please!",
    );
  }

  const result = await prisma.complaint.update({
    where: {
      id: id,
    },
    data: restData,
  });

  return result;
};

export const complaintService = {
  addComplaint,
  myComplaint,
  complaintDetails,
  complaintUpdateStatus,
  completeComplaint,
  updateComplaint,
};
