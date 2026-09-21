import z from "zod";

const ServiceCreateZodSchema = z.object({
  name: z.string("Not A String!"),
  serviceFee: z.string("Not A String!"),
});

const ServiceUpdateZodSchema = z.object({
  name: z.string("Not A String!"),
  serviceFee: z.string("Not A String!"),
  serviceId: z.string("Not A String!"),
});

export const serviceValidation = {
  ServiceCreateZodSchema,
  ServiceUpdateZodSchema,
};
