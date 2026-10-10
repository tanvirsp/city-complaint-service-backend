import { prisma } from "../../lib/prisma";
import { ICreateCategory, IUpdateCategory } from "./category.interface";

const createCategory = async (payload: ICreateCategory) => {
  const { name } = payload;
  const result = await prisma.category.create({
    data: {
      name,
      type: "COMPLAINT",
    },
  });

  return result;
};

const getCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id: id },
  });

  return result;
};

const updateCategory = async (payload: IUpdateCategory) => {
  const { id, name, type } = payload;
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      type: type,
    },
  });

  return result;
};

const categoryById = async (id: string) => {
  const result = await prisma.category.findFirst({
    where: { id: id },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  categoryById,
};
