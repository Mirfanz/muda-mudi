"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod";
import clsx from "clsx";
import Image from "next/image";

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
    <section className="h-full p-3 flex justify-center items-center">
      <Image fill alt="bg" objectFit="cover" src={"/src/images/bg.jpg"} />
      <Card className="max-w-96 w-full">
        <CardBody className="p-8">
          <div className="text-4xl mt-6 mb-8 text-center font-semibold">
            {showPass ? "0_0" : "> _ <"}
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-2xl mb-2 font-semibold">Selamat Datang</h3>
            <p className="text-foreground-500 mb-1 text-sm">
              Assalamu&apos;alaikum, login dulu yaaw
            </p>
          </div>
          <form noValidate className="flex flex-col" onSubmit={submitFormLogin}>
            <Input
              className={clsx(!!errors?.phone ? "mb-1" : "mb-3")}
              errorMessage={errors?.phone?._errors[0]}
              isInvalid={!!errors?.phone}
              name="phone"
              placeholder="Nomor Telepon"
              readOnly={isLoading}
              type="number"
              value={fields.phone}
              onChange={handleInputChange}
            />
            <Input
              className={clsx(!!errors?.password ? "mb-1" : "mb-3")}
              endContent={
                <Button
                  isIconOnly
                  className="-me-2 text-foreground-500"
                  size="sm"
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
              errorMessage={errors?.password?._errors[0]}
              isInvalid={!!errors?.password}
              name="password"
              placeholder="Password"
              readOnly={isLoading}
              type={showPass ? "text" : "password"}
              value={fields.password}
              onChange={handleInputChange}
            />
            <div className="flex mb-4 justify-between items-center">
              <Checkbox isSelected={fields.remember} size="sm">
                Remember Me
              </Checkbox>
              <small className="ms-auto">Lupa Password?</small>
            </div>
            <Button color="primary" isLoading={isLoading} type="submit">
              LOGIN
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default LoginUI;
