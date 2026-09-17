import { Role } from "../../../generated/prisma/enums";

export interface IAddStaff {
  name: string;
  email: string;
  address?: string;
  categoryId: string;
  experienceYears: number;
  bio?: string;
  contactNumber?: string;
  password: string;
  role: Role;
}
