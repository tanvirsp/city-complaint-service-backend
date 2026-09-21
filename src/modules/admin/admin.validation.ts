import z from "zod";

const ComplaintAssignToStaffZodSchema = z.object({
  complaintId: z.string("Not A String!"),
  staffId: z.string("Not A String!"),
});

const ServiceAssignToStaffZodSchema = z.object({
  serviceRequestId: z.string("Not A String!"),
  staffId: z.string("Not A String!"),
});

export const adminValidation = {
  ComplaintAssignToStaffZodSchema,
  ServiceAssignToStaffZodSchema,
};
