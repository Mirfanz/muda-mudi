"use client";

import { Card, CardBody } from "@heroui/card";
import React from "react";
import { User } from "@heroui/user";

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
      <CardBody className="">
        <User
          avatarProps={{
            src: user.avatar || "",
          }}
          className="me-auto"
          description={user.role}
          name={user.name}
        />
      </CardBody>
    </Card>
  );
};

export default UserCard;
