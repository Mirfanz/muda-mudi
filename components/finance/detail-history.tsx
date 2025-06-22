"use client";

import { Chip } from "@heroui/chip";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { User } from "@heroui/user";
import clsx from "clsx";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import { FinancialHistoryType } from "@/types";
import dayjs from "@/lib/utils/dayjs";

type Props = {
  data: FinancialHistoryType | null;
  onClose: () => void;
};

const DetailHistoryModal = ({ data, onClose }: Props) => {
  return (
    <Modal isOpen={data !== null} onClose={onClose}>
      <ModalContent>
        <ModalBody className="p-4 gap-0">
          <p className="text-sm text-foreground-600 mb-1">
            {dayjs(data?.date.toISOString().slice(0, 10), {}).format(
              "dddd, DD MMMM YYYY",
            )}
          </p>
          <h2 className="text-xl font-semibold mb-1">{data?.title}</h2>
          <p className="text-sm mb-4">
            {data?.description || "Tidak ada deskripsi."}
          </p>
          <div className="flex justify-between items-center mb-4">
            <Chip color={data?.income ? "success" : "danger"} variant="flat">
              {data?.income ? "PEMASUKAN" : "PENGELUARAN"}
            </Chip>
            <p
              className={clsx(
                "text-2xl font-bold",
                data?.income ? "text-success-500" : "text-danger-500",
              )}
            >
              {(data?.income ? "+" : "-") +
                data?.amount.toLocaleString("id-ID")}
            </p>
          </div>
          {data?.images.length !== 0 && (
            <Swiper
              className="w-full aspect-video rounded-lg"
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={5}
            >
              {data?.images.map((image, index) => (
                <SwiperSlide key={index} className="bg-foreground-100">
                  <Image
                    fill
                    alt={`Image ${index + 1}`}
                    className="w-full h-full rounded-lg "
                    objectFit="cover"
                    src={image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {/* <Skeleton className="w-full aspect-video rounded-lg" /> */}
          <div className="flex items-center mt-3 justify-between">
            <small className="text-xs text-foreground-500">
              {dayjs(data?.createdAt).format("DD/MM/YYYY, HH:mm:ss")}
            </small>
            <User
              avatarProps={{
                src: data?.author.avatar || "",
                size: "sm",
              }}
              name={data?.author.name}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailHistoryModal;
