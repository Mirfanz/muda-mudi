"use client";

import { Button } from "@heroui/button";
import React from "react";
import { useAuth } from "../auth-provider";

type Props = {};

const Account = (props: Props) => {
  const auth = useAuth();
  return (
    <section className="">
      <h2>Account</h2>
      {auth.isLoading && "Loading...."}
      {auth.user?.name}
      <Button onPress={auth.logout}>Logout</Button>
    </section>
  );
};

export default Account;
