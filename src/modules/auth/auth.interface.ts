import { Role } from "../../../generated/prisma/enums";

export interface IRegisterCitizenPayload {
  name: string;
  email: string;
  password: string;
  citizen: {
    contactNumber?: string;
  };
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdatePayload {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface IGoogleLoginPayload {
  idToken: string;
}
