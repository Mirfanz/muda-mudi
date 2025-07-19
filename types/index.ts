import {
  User,
  Event,
  FinancialHistory,
  Attendance,
  Attendees,
  Charge,
  ChargedUser,
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
  present: AttendeesType[];
  absent: AttendeesType[];
};

export type AttendeesType = Attendees & {
  user: UserType;
};

export type EventType = Event & {
  author: UserType;
};

export type DetailEventType = EventType & {
  attendances: AttendanceType[];
};

export type ChargedUserType = ChargedUser & {
  user: UserType;
};

export type ChargeType = Charge & {
  author: UserType;
  users: {
    unpaid: ChargedUserType[];
    paid: ChargedUserType[];
  };
};
