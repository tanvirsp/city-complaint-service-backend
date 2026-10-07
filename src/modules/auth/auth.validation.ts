import z from "zod";

const CitizenRegistrationZodSchema = z.object({
  name: z.string("Not A String!!!!!"),
  email: z.email("Not email!!"),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
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
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
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
