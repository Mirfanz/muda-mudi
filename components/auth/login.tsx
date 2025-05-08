"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type Props = {};

const Login = (props: Props) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <section className="h-full flex justify-center items-center">
      <Card className="max-w-96 p-1">
        <CardBody>
          <div className="mb-4">
            <h3 className="font-bold text-3xl mb-2 text-primary">
              Login Lurr...
            </h3>
            <p className="text-foreground-500 mb-1 text-sm">
              Selamat datang di <strong>MudaMudi</strong>, silahkan login untuk
              melanjutkan.
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <Input name="number" type="number" placeholder="Nomor Telepon" />
            <Input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              endContent={
                <Button
                  size="sm"
                  isIconOnly
                  className="-me-2 text-foreground-500"
                  variant="light"
                  onPress={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </Button>
              }
            />
            <div className="flex mb-1 justify-between items-center">
              <Checkbox size="sm">Remember Me</Checkbox>
              <small className="ms-auto">Lupa Password?</small>
            </div>
            <Button color="primary">LOGIN</Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default Login;
