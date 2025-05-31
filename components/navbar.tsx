"use client";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { DonateIcon, InstagramIcon, QuranIcon } from "./icons";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

type Props = {
  hideBrand?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

export const Navbar = ({ hideBrand, startContent, endContent }: Props) => {
  const [showLink, setShowLink] = useState(true);

  return (
    <nav className="container !text-primary-foreground px-2 bg-primary-500">
      <div className="flex py-2 gap-2 items-center">
        {startContent}
        {!hideBrand && (
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <svg
              className="h-7 w-7"
              fill="none"
              height="664"
              viewBox="0 0 518 664"
              width="518"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="shadow-sm"
                d="M255.678 651.096C257.588 652.747 260.412 652.747 262.322 651.095C308.472 611.198 373.532 573.475 433.776 571.575C436.427 571.491 438.614 569.421 438.779 566.773C442.521 506.726 452.762 462.837 482 399C505.16 348.434 520.402 278.5 489 208.5C465.673 156.5 424.5 119.5 347 75.5C311.837 55.5363 276.202 25.6526 261.258 12.8096C259.374 11.1913 256.625 11.1918 254.755 12.8246C240.031 25.6759 205.923 55.5441 170.774 75.5C93.2735 119.5 52.1007 156.5 28.7736 208.5C-2.6283 278.5 12.6138 348.434 35.7736 399C65.0117 462.837 75.2528 506.726 78.9941 566.773C79.1591 569.421 81.3463 571.491 83.9978 571.575C144.252 573.475 209.518 611.198 255.678 651.096Z"
                fill="#fff"
                stroke="#0F5A84"
                strokeWidth={22}
              />
              <path
                d="M261 481.5C265.5 461.5 268.679 448.303 287.5 425.5C313.5 394 350.5 376.5 378.5 360.5C400.167 346.833 443 311.002 443 277C443 262 433.5 260 425 273.5C403 304 367.5 330 328.5 342C289.5 354 276 361.5 250.5 390C245 379.5 235 360.8 221.5 350C211.739 342.191 191.5 331.116 179 321.5C166.5 311.885 159.7 305 149.5 296.5C139.3 288 132.5 296.912 132.5 304C132.5 310.5 134.5 318 140.5 326.5C146.5 335 160.938 348.439 163 350.5C166 353.5 176.5 365.5 177 368.5C177.4 370.9 172.326 368.797 164.5 364C149 354.5 123 335 115 315C107 295 105.5 291 104 274.5C102.5 258 98.6 239 93 232C87.4 225 73 220.5 73 234C73 247.5 56.5 353.5 129.5 410.5C129.5 410.5 149.5 426 158 434C166.5 442 176.4 448.7 174 471.5C184.5 470.5 208.3 469.8 219.5 475C233.5 481.5 251.5 481.5 261 481.5Z"
                fill="#B7302E"
                stroke="#B7302E"
              />
              <path
                d="M278.5 479.5C280.333 465.666 296.805 426.195 342 402C391.149 375.688 405.793 362.192 430.959 338.998L431.5 338.5C443.979 327 445.365 345.352 437 359C427.5 374.5 405.157 404.73 364 431C340.5 446 322.5 459 278.5 479.5Z"
                fill="#B7302E"
              />
              <path
                d="M431.5 338.5C443.979 327 445.365 345.352 437 359C427.5 374.5 405.157 404.73 364 431C340.5 446 322.5 459 278.5 479.5C280.333 465.666 296.805 426.195 342 402C391.149 375.688 405.793 362.192 430.959 338.998M431.5 338.5L430.959 338.998M431.5 338.5C431.319 338.667 431.139 338.833 430.959 338.998"
                stroke="#B7302E"
              />
              <path
                d="M265.999 342.5V295.5C265.999 277.5 273.499 262 285.999 250.5C337.499 246 369.499 204.5 365 159.5C303.499 159.5 275.999 206.5 277.999 241C273.999 245.333 265.999 254.3 265.999 255.5V196C295.999 168.5 294.5 117 258 90.5C221.5 117 220.42 168.5 250.42 196V255.5C250.42 254.3 242.42 245.333 238.42 241C240.42 206.5 212.92 159.5 151.42 159.5C146.92 204.5 178.92 246 230.42 250.5C242.92 262 250.42 277.5 250.42 295.5V342.5H258H265.999Z"
                fill="#F6BF1E"
                stroke="#F6BF1E"
              />
              <path
                d="M101 487C151.5 492 186.251 482.74 205.5 488.5C269 507.5 270 503 354.5 475C371.696 469.302 410.5 475.5 419 481L410.5 517C400.833 514.167 371.6 510.2 350 517C323 525.5 298.5 539 277.5 538.5C256.5 538 209.625 522.5 193.5 522.5C169 522.5 146 532 108.5 531L101 487Z"
                fill="#0F5A84"
                stroke="#0F5A84"
              />
              <path
                d="M141 549C152.667 545.5 179.094 539 191.5 539C210 539 248 555 276 555.5C304 556 337.675 537.129 354.5 534.5C370.5 532 387 531.5 399.5 534.5C407.822 536.497 407 540.38 394 543.5C356 552.62 303 581 258.5 611C229 589.5 186.5 565.5 141 549Z"
                fill="#0F5A84"
                stroke="#0F5A84"
              />
            </svg>

            <div className="">
              <h3 className="font-semibold text-lg">PEMOEDA</h3>
              {/* <small className="text-xs">Klumpit Kulon</small> */}
            </div>
          </NextLink>
        )}

        <div className="flex items-center gap-1 lg:gap-2 ms-auto">
          <Button
            isIconOnly
            className="text-primary-foreground text-opacity-50"
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
                <Button
                  isIconOnly
                  as={Link}
                  className="text-primary-foreground animate-appearance-in"
                  href={siteConfig.links.instagram}
                  radius="full"
                  size="sm"
                  target="_blank"
                  title="Instagram"
                  variant="light"
                >
                  <InstagramIcon className="w-5 h-5 fill-primary-foreground" />
                </Button>
              </Tooltip>
              <Tooltip content="Quran">
                <Button
                  isIconOnly
                  as={Link}
                  className="text-primary-foreground animate-appearance-in"
                  href="https://quran.com/"
                  radius="full"
                  size="sm"
                  target="_blank"
                  title="Quran"
                  variant="light"
                >
                  <QuranIcon className="w-4 h-4 fill-primary-foreground" />
                </Button>
              </Tooltip>
              <Tooltip content="Donasi">
                <Button
                  isIconOnly
                  as={Link}
                  className="text-primary-foreground animate-appearance-in"
                  href={"/finance/donation"}
                  radius="full"
                  size="sm"
                  target="_blank"
                  title="Donate"
                  variant="light"
                >
                  <DonateIcon className="w-4 h-4 fill-primary-foreground" />
                </Button>
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
