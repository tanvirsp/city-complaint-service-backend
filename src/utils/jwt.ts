import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secretKay: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secretKay, {
    expiresIn,
  } as SignOptions);
  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: any) {
    console.log("Token verificaiton failed", error);
    {
      return {
        sucess: false,
        error: error.message,
      };
    }
  }
};
export const jwtUtils = { createToken, verifyToken };
