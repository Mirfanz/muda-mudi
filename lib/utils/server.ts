import * as jose from "jose";
import * as bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

import { SessionPayload, UserType } from "@/types";

export const generateToken = async (payload: { user: UserType }) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(secret);

  return token;
};

export const verifyToken = async (token?: string) => {
  try {
    if (!token) return null;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
};

export const hashPassword = (password: string) => {
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS);

  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

const ErrorCodes: any = {
  P1000: "Unauhenticated",
  P1002: "Database error",
  P1003: "Database error",
  P1008: "Operation timeout",
  P1009: "Database already exists",
  P1010: "User denied access the database",
  P1011: "Error opening TLS connection",
  P1012: "Error prisma version",
  P1013: "Database string is invalid",
  P1014: "The underlying for model doesn't exist",
  P1015: "Error database version",
  P1016: "Incorrect parameters",
  P1017: "Connection failed",
  P2000: "Value too long",
  P2001: "Record doesnt exist",
  P2002: "Akun sudah terdaftar",
  P2003: "Foreign key constraint failed",
  P2004: "A constraint failed",
  P2005: "Invalid field's value",
  P2006: "Invalid field's value",
  P2007: "Data validation error",
  P2008: "Failed to parse the query",
  P2009: "Failed to validate the query",
  P2010: "Raw query failed",
  P2011: "Null constraint violation",
  P2012: "Missing a required value",
  P2013: "Missing a required argument",
  P2014: "Violate the required relation",
  P2015: "Related record could not be found",
  P2016: "Query interpretation error",
  P2017: "Relation models not connected",
  P2018: "Required connected records",
  P2019: "Input error",
  P2020: "Value out of range",
  P2021: "Table doesn't exist",
  P2022: "Column doesn't exist",
  P2023: "Incosistent column data",
  P2024: "Timed out fetching new connection",
  P2025: "An operation failed",
  P2026: "Database provider doesn't support this operation",
  P2027: "Multiple errors occurred",
  P2028: "Transaction API error",
  P2029: "Query parameter limited",
  P2030: "Cannot find a fulltext index",
  P2031: "Prisma needs to perform transactions",
  P2033: "A number used in the query does not fit into a 64 bit signed integer",
  P2034: "Transaction failed due to a write conflict or a deadlock",
  P2035: "Assertion violation on the database",
  P2036: "Error in external connector",
  P2037: "Too many database connections opened",
  P3000: "Failed to create database",
  P3001: "Migration possible with destructive changes",
  P3002: "Attempted migration was rolled back",
  P3003: "The format of migrations changed",
  P3004: "The database is a system database",
  P3005: "The database schema is not empty",
  P3006: "Migration failed",
  P3007: "Features are not allowed",
  P3008: "Migration already recorded",
  P3009: "Failed migrations in the target database",
  P3010: "The name of the migration is too long",
  P3011: "Migration cannot be rolled back",
  P3012: "Migration cannot be rolled back",
  P3013: "Datasource provider arrays are no longer supported in migrate",
};

export const getErrorMessage = (code: string, defaultMessage?: string) =>
  ErrorCodes[code] || defaultMessage || "Unknown error";

export const isAuthorized = (userRole: string, authorizedRoles: string[]) =>
  authorizedRoles.includes(userRole);

export const isAuthorizedOrThrow = (
  userRole: Role,
  authorizedRoles: Role[],
) => {
  if (!authorizedRoles.includes(userRole)) throw new Error("unauthorized");
};

export const respError = (
  message: string,
): { success: false; message: string } => ({
  success: false,
  message,
});
