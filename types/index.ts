import {
  User,
  Event,
  FinancialHistory,
  Attendance,
  AttendanceHistory,
} from "@prisma/client";
import { JWTPayload } from "jose";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserType = Omit<
  User,
  "password" | "deletedAt" | "createdAt" | "updatedAt"
>;

export type RespType<data = {}, more = {}> =
  | {
      success: false;
      message: string;
    }
  | ({
      success: true;
      message: string;
      data: data;
    } & more);

export type SessionPayload = JWTPayload & {
  user: UserType;
};

export type FinancialHistoryType = FinancialHistory & {
  author: UserType;
};

export type AttendanceType = Attendance & {
  histories: AttendanceHistoryType[];
};

export type AttendanceHistoryType = AttendanceHistory & {
  user: UserType;
};

export type EventType = Event & {
  author: UserType;
};

export type DetailEventType = EventType & {
  attendances: AttendanceType[];
};
