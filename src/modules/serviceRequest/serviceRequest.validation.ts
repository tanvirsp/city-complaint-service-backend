import z from "zod";

const ServiceRequestCreateZodSchema = z.object({
  serviceId: z.string("Not A String!"),
  title: z.string("Not A String!"),
  address: z.string("Not A String!"),
  contactNumber: z.string("Not A String!"),
});

const ServiceRequestUpdateZodSchema = z.object({
  serviceId: z.string("Not A String!"),
  serviceRequestId: z.string("Not A String!"),
  title: z.string("Not A String!"),
  address: z.string("Not A String!"),
  contactNumber: z.string("Not A String!"),
});

export const serviceRequestValidation = {
  ServiceRequestCreateZodSchema,
  ServiceRequestUpdateZodSchema,
};
