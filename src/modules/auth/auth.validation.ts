import z from "zod";

const CitizenRegistrationZodSchema = z.object({
  name: z.string("Not A String!!!!!"),
  email: z.email("Not email!!"),
  password: z.string().min(6, "Password Must Minimum 6 Characters Long."),
  citizen: z
    .object({
      contactNumber: z.string().optional(),
    })
    .optional(),
});

const CitizenEmailVerifyZodSchema = z.object({
  email: z.email("Not email!!"),
  otp: z.string().length(6),
});

const LoginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password Must Minimum 6 Characters Long."),
});

const ForgotPasswordZodSchema = z.object({
  email: z.email(),
});

const ResetPasswordZodSchema = z.object({
  email: z.email(),
  newPassword: z.string().min(6, "Password Must Minimum 6 Characters Long."),
  otp: z.string().length(6),
});

export const userValidation = {
  CitizenRegistrationZodSchema,
  CitizenEmailVerifyZodSchema,
  LoginZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema,
};
