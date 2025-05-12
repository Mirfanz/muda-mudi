"use client";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import React from "react";

import { UserType } from "@/types";

type Props = {
  user: UserType;
  hidden: boolean;
};

const UserCard = ({ user, hidden }: Props) => {
  return hidden ? (
    ""
  ) : (
    <Card shadow="sm">
      <CardBody>
        <div className="flex gap-3 items-center">
          <Avatar src={user.image_url || ""} />
          <div className="">
            <h6 className="-mb-1 text-sm">{user.name}</h6>
            <small className="text-foreground-500 text-xs capitalize">
              {user.role.toLowerCase()}
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
