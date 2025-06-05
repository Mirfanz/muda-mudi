"use client";

import {
  BanknotesIcon,
  BellAlertIcon,
  BoltIcon,
  BookOpenIcon,
  CalendarDateRangeIcon,
  HeartIcon,
  HomeIcon,
  QrCodeIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "@heroui/card";
import Link from "next/link";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const listMenu = [
  {
    label: "Quran",
    icon: BookOpenIcon,
    href: "https://quran.com/",
  },
  {
    label: "Donasi",
    icon: HeartIcon,
    href: "/donation",
  },
  {
    label: "Keuangan",
    icon: BanknotesIcon,
    href: "/finance",
  },
  {
    label: "Acara",
    icon: CalendarDateRangeIcon,
    href: "/events",
  },
  {
    label: "Denda",
    icon: RocketLaunchIcon,
    href: "#",
  },
  {
    label: "Anggota",
    icon: UserGroupIcon,
    href: "#",
  },
  {
    label: "Denda",
    icon: BoltIcon,
    href: "#",
  },
  {
    label: "Absen",
    icon: QrCodeIcon,
    href: "#",
  },
  {
    label: "Home",
    icon: HomeIcon,
    href: "#",
  },
  {
    label: "Bell",
    icon: BellAlertIcon,
    href: "#",
  },
];

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <section className="">
        <Swiper
          autoplay
          className="!p-2 !pb-0"
          effect="coverflow"
          modules={[EffectCoverflow, Autoplay, Pagination]}
          pagination={{
            el: ".pagi",
          }}
          spaceBetween={10}
        >
          {[1, 2, 3].map((i) => (
            <SwiperSlide key={i}>
              <div className="aspect-[5/2] flex justify-center items-center p-2">
                <Image
                  fill
                  alt="sdsds"
                  className="rounded-lg"
                  src={"/src/images/bg.jpg"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="ms-2">
          <div className="pagi" />
        </div>
      </section>
      <section>
        <div className="grid grid-rows-2 scrollbar-hide gap-y-4 justify-start grid-flow-col my-4 mx-2 overflow-x-auto">
          {listMenu.map((menu) => (
            <div
              key={menu.label}
              className="flex items-center bg-red-200s w-[5rem] gap-1 flex-col"
            >
              <Card
                isPressable
                as={Link}
                className="w-14 bg-foreground-100 dark:bg-foreground-50 text-teal-600 dark:text-teal-500 gap-1 flex flex-col justify-center items-center aspect-square"
                href={menu.href}
                shadow="none"
              >
                <menu.icon className="w-8 h-8" />
              </Card>
              <small className="text-xs text-center text-foreground-500">
                {menu.label}
              </small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
