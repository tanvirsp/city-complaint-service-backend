import z from "zod";

const ServiceCreateZodSchema = z.object({
  name: z.string("Not A String!"),
  serviceFee: z.number("Not A Number!"),
});

const ServiceUpdateZodSchema = z.object({
  name: z.string("Not A String!"),
  serviceFee: z.number("Not A Number!"),
  serviceId: z.string("Not A String!"),
});

export const serviceValidation = {
  ServiceCreateZodSchema,
  ServiceUpdateZodSchema,
};
