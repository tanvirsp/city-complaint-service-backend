import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { IUpdatePayload } from "./user.interface";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      imagePublicId: true,
      imageUrl: true,
    },
  });

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

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      imageUrl: cloudinaryResult.secure_url,
      imagePublicId: cloudinaryResult.public_id,
    },
    omit: {
      password: true,
    },
  });

  if (currentUser?.imagePublicId && currentUser.imageUrl) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId);
  }

  return updatedUser;
};

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: userId },
    include: {
      citizen: true,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const updateProfile = async (userId: string, payload: IUpdatePayload) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload,
    omit: {
      password: true,
    },
  });

  return user;
};

export const userServices = {
  uploadProfileImage,
  getMyProfile,
  updateProfile,
};
