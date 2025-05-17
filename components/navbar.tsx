"use client";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { DonateIcon, InstagramIcon, XIcon } from "./icons";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

type Props = {
  hideBrand?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

export const Navbar = ({ hideBrand, startContent, endContent }: Props) => {
  const [showLink, setShowLink] = useState(false);

  return (
    <nav className="container !text-primary-foreground px-2 bg-primary-500">
      <div className="flex py-2 gap-2 items-center">
        {startContent}
        {!hideBrand && (
          <NextLink className="flex justify-start items-center gap-2" href="/">
            {/* <FireIcon className="w-8 h-8" /> */}
            <svg
              className="w-7 h-7 mx-1"
              fill="none"
              height="393"
              viewBox="0 0 374 393"
              width="374"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M191 392.5C195.5 372.5 198.679 359.303 217.5 336.5C243.5 305 280.5 287.5 308.5 271.5C330.167 257.833 373 222.002 373 188C373 173 363.5 171 355 184.5C333 215 297.5 241 258.5 253C219.5 265 206 272.5 180.5 301C175 290.5 165 271.8 151.5 261C141.739 253.191 121.5 242.116 109 232.5C96.5 222.885 89.7 216 79.5 207.5C69.3 199 62.5 207.912 62.5 215C62.5 221.5 64.5 229 70.5 237.5C76.5 246 90.9385 259.439 93 261.5C96 264.5 106.5 276.5 107 279.5C107.4 281.9 102.326 279.797 94.5 275C79 265.5 53 246 45 226C37 206 35.5 202 34 185.5C32.5 169 28.6 150 23 143C17.4 136 3.00003 131.5 3.00004 145C3.00005 158.5 -13.5 264.5 59.5 321.5C59.5 321.5 79.5 337 88 345C96.5 353 106.4 359.7 104 382.5C114.5 381.5 138.3 380.8 149.5 386C163.5 392.5 181.5 392.5 191 392.5Z"
                fill="#B7302E"
                stroke="#B7302E"
              />
              <path
                d="M208.5 390.5C210.333 376.666 226.805 337.195 272 313C321.149 286.688 335.793 273.192 360.959 249.998L361.5 249.5C373.979 238 375.365 256.352 367 270C357.5 285.5 335.157 315.73 294 342C270.5 357 252.5 370 208.5 390.5Z"
                fill="#B7302E"
              />
              <path
                d="M361.5 249.5C373.979 238 375.365 256.352 367 270C357.5 285.5 335.157 315.73 294 342C270.5 357 252.5 370 208.5 390.5C210.333 376.666 226.805 337.195 272 313C321.149 286.688 335.793 273.192 360.959 249.998M361.5 249.5L360.959 249.998M361.5 249.5C361.319 249.667 361.139 249.833 360.959 249.998"
                stroke="#B7302E"
              />
              <path
                d="M195.999 253.5V206.5C195.999 188.5 203.499 173 215.999 161.5C267.499 157 299.499 115.5 295 70.4999C233.499 70.4999 205.999 117.5 207.999 152C203.999 156.333 195.999 165.3 195.999 166.5V107C225.999 79.4999 224.5 28 188 1.5C151.5 28 150.42 79.4999 180.42 107V166.5C180.42 165.3 172.42 156.333 168.42 152C170.42 117.5 142.92 70.4999 81.4202 70.4999C76.9202 115.5 108.92 157 160.42 161.5C172.92 173 180.42 188.5 180.42 206.5V253.5H188H195.999Z"
                fill="#F6BF1E"
                stroke="#F6BF1E"
              />
            </svg>

            <div className="">
              <h3 className="font-semibold -mb-3">MudaMudi</h3>
              <small className="text-xs">Klumpit Kulon</small>
            </div>
          </NextLink>
        )}

        <div className="flex items-center gap-1 lg:gap-2 ms-auto">
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
        {endContent}
      </div>
    </nav>
  );
};
