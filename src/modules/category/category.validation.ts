import z from "zod";

const CreateZodSchema = z.object({
  name: z.string("Not A String!"),
  type: z.string("Not A String!"),
});

const DeleteZodSchema = z.object({
  id: z.string("Not A String!"),
});

const UpdateZodSchema = z.object({
  id: z.string("Not A String!"),
  name: z.string("Not A String!"),
  type: z.string("Not A String!"),
});

export const categoryValidation = {
  CreateZodSchema,
  DeleteZodSchema,
  UpdateZodSchema,
};
