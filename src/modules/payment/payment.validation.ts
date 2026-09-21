import z from "zod";

const PaymentCreateZodSchema = z.object({
  serviceRequestId: z.string("Not A String!"),
});

export const paymentValidation = {
  PaymentCreateZodSchema,
};
