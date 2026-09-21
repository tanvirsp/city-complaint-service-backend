import { Role, UserStatus } from "../../../generated/prisma/enums";

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

export interface IUserStatusUpdate {
  userId: string;
  status: UserStatus;
}

export interface IComplaintAssignToStaff {
  complaintId: string;
  staffId: string;
}

export interface IServiceRequestAssignToStaff {
  serviceRequestId: string;
  staffId: string;
}
