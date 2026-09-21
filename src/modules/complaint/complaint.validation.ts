import z from "zod";

const ComplaintCreateZodSchema = z.object({
  title: z.string("Not A String!"),
  categoryId: z.string("Not A String!"),
  description: z.string("Not A String!"),
  location: z.string("Not A String!"),
});

const ComplaintUpdateZodSchema = z.object({
  id: z.string("Not A String!"),
  status: z.string("Not A String!"),
});

const AssignToStaffZodSchema = z.object({
  complaintId: z.string("Not A String!"),
  staffId: z.string("Not A String!"),
});

export const complaintValidation = {
  ComplaintCreateZodSchema,
  ComplaintUpdateZodSchema,
  AssignToStaffZodSchema,
};
