import { prisma } from "../../lib/prisma";
import { ICreateCategory, IUpdateCategory } from "./category.interface";

const createCategory = async (payload: ICreateCategory) => {
  const { name, type } = payload;
  const result = await prisma.category.create({
    data: {
      name,
      type,
    },
  });

  return result;
};

const getCategories = async () => {
  const result = await prisma.category.findMany({});

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

export const categoryService = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
