import { CategoryType } from "../../../generated/prisma/enums";

export interface ICreateCategory {
  name: string;
  type: CategoryType;
}

export interface IUpdateCategory {
  id: string;
  name: string;
  type?: CategoryType;
}
