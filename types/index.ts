import { Role } from "@prisma/client";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserRoleType = Role;

export type UserType = {
  id: string;
  name: string;
  phone: string;
  role: UserRoleType;
  birth: Date;
  image_url: string | null;
  active: boolean;
};
