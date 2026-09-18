import { ComplaintStatus, Priority } from "../../../generated/prisma/enums";

export interface IComplainCreate {
  title: string;
  categoryId: string;
  description: string;
  location: string;
  priority: Priority;
}

export interface IStatusUpdate {
  id: string;
  status: ComplaintStatus;
}

export interface ICompleteComplaint {
  complaintId: string;
  status: ComplaintStatus;
  rejectReason?: string;
}
