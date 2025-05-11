"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod";
import clsx from "clsx";
import { useAuth } from "../auth-provider";

type Props = {};

const schema = z.object({
  phone: z.string().regex(/^08[1-9][0-9]{7,10}$/, "Nomor telepon tidak valid"),
  password: z.string().min(8, { message: "Minimal 8 karakter" }),
  remember: z.boolean(),
});

const LoginUI = (props: Props) => {
  const auth = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [fields, setFields] = useState({
    phone: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = useState<z.inferFormattedError<typeof schema>>();
  const [isLoading, setIsLoading] = useState(false);

  const submitFormLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = schema.safeParse(fields);
    const error = validation.error?.format();
    setErrors(error);
    if (error) return;

    setIsLoading(true);
    auth
      .login(fields.phone, fields.password)
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="h-full flex justify-center items-center">
      <Card className="max-w-96 p-1">
        <CardBody>
          <div className="mb-4">
            <h3 className="font-bold text-3xl my-4 text-primary">
              Login Lurr...
            </h3>
            <p className="text-foreground-500 mb-1 text-sm">
              Selamat datang di <strong>MudaMudi</strong>, silahkan login untuk
              melanjutkan.
            </p>
          </div>
          <form className="flex flex-col" noValidate onSubmit={submitFormLogin}>
            <Input
              name="phone"
              type="number"
              placeholder="Nomor Telepon"
              onChange={handleInputChange}
              value={fields.phone}
              isInvalid={!!errors?.phone}
              errorMessage={errors?.phone?._errors[0]}
              className={clsx(!!errors?.phone ? "mb-1" : "mb-3")}
              readOnly={isLoading}
            />
            <Input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={handleInputChange}
              value={fields.password}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?._errors[0]}
              className={clsx(!!errors?.password ? "mb-1" : "mb-3")}
              readOnly={isLoading}
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
            <div className="flex mb-4 justify-between items-center">
              <Checkbox isSelected={fields.remember} size="sm">
                Remember Me
              </Checkbox>
              <small className="ms-auto">Lupa Password?</small>
            </div>
            <Button type="submit" isLoading={isLoading} color="primary">
              LOGIN
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default LoginUI;
