import { UserType } from "@/types";
import * as jose from "jose";

export const generateToken = async (payload: { user: UserType }) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(secret);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};
