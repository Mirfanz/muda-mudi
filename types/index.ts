import { User } from "@prisma/client";
import { JWTPayload } from "jose";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserType = Omit<
  User,
  "password" | "deletedAt" | "createdAt" | "updatedAt"
>;

export type RespType<T = {}> =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
      message: string;
      data: T;
    };

export type SessionPayload = JWTPayload & {
  user: UserType;
};

export type FinanceHistory = {
  id: string;
  income: boolean;
  title: string;
  description?: string;
  amount: number;
  images: string[];
  date: Date;
  createdAt: Date;
  authorId: string;
  author: UserType;
};
