"use client";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { ChevronDoubleLeftIcon, FireIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { DonateIcon, InstagramIcon, XIcon } from "./icons";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [showLink, setShowLink] = useState(false);

  return (
    <nav className="container !text-primary-foreground px-2 bg-primary-500">
      <div className="flex justify-between py-2 items-center">
        <NextLink className="flex justify-start items-center gap-2" href="/">
          <FireIcon className="w-8 h-8" />
          <div className="">
            <h3 className="font-semibold -mb-3">MudaMudi</h3>
            <small className="text-xs">Klumpit Kulon</small>
          </div>
        </NextLink>

        <div className="flex items-center gap-1 lg:gap-2">
          {/* <div className="flex"> */}
          <Button
            isIconOnly
            className="text-primary-foreground"
            size="sm"
            variant="light"
            onPress={() => setShowLink((prev) => !prev)}
          >
            <ChevronDoubleLeftIcon
              className={clsx(
                "w-4 h-4 duration-300",
                showLink ? "-rotate-180" : "rotate-0",
              )}
            />
          </Button>
          {showLink && (
            <Fragment>
              <Tooltip content="Instagram">
                <Link href={siteConfig.links.instagram} target="_blank">
                  <Button
                    isIconOnly
                    className="text-primary-foreground animate-appearance-in me-1"
                    radius="full"
                    size="sm"
                    title="Instagram"
                    variant="light"
                  >
                    <InstagramIcon className="w-5 h-5 fill-primary-foreground" />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip content="X">
                <Link href={siteConfig.links.github} target="_blank">
                  <Button
                    isIconOnly
                    className="text-primary-foreground animate-appearance-in me-1"
                    radius="full"
                    size="sm"
                    title="X Twitter"
                    variant="light"
                  >
                    <XIcon className="w-5 h-5 fill-primary-foreground" />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip content="Donasi">
                <Link href={"/finance/donation"} target="_blank">
                  <Button
                    isIconOnly
                    className="text-primary-foreground animate-appearance-in"
                    radius="full"
                    size="sm"
                    title="Donate"
                    variant="light"
                  >
                    <DonateIcon className="w-5 h-5 fill-primary-foreground" />
                  </Button>
                </Link>
              </Tooltip>
            </Fragment>
          )}
          <Tooltip content="Theme">
            <ThemeSwitch className="text-primary-foreground" />
          </Tooltip>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};
