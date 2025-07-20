"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { User } from "@heroui/user";
import { Role } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";
import { Alert } from "@heroui/alert";
import Link from "next/link";

import { ChargedUserType, ChargeType } from "@/types";
import { useAuth } from "@/components/auth-provider";
import { PayCharge } from "@/lib/charge.actions";

type Props = {
  charge: ChargeType | null;
  onClose: () => void;
  refetch?: () => void;
};

const ChargeDetailModal = ({ onClose, charge, refetch }: Props) => {
  const auth = useAuth();
  const [needPayment, setNeedPayment] = React.useState(false);
  const handlePaidButton = (data: ChargedUserType) => {
    if (!charge) return;
    onClose();
    Swal.fire({
      icon: "question",
      titleText: "Konfirmasi?",
      text: `Konfirmasi ${data.user.name} sudah melakukan pembayaran.`,
      showCancelButton: true,
      confirmButtonText: "Ya, Sudah",
      cancelButtonText: "Belum",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      PayCharge({ chargeId: charge.id, userId: data.userId }).then((resp) => {
        if (!resp.success)
          return Swal.fire({
            icon: "error",
            title: "Gagal",
            text: resp.message,
          });
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pembayaran berhasil dikonfirmasi.",
        });
        onClose();
        refetch?.();
      });
    });
  };

  React.useEffect(() => {
    if (charge)
      for (const i of charge.users.unpaid)
        if (i.userId == auth.user?.id) {
          setNeedPayment(true);
          break;
        }
  }, [charge]);

  return (
    <Modal isOpen={!!charge} scrollBehavior="inside" onClose={onClose}>
      <ModalContent>
        <ModalHeader>{charge?.title}</ModalHeader>
        <ModalBody className="px-4 pt-0">
          {needPayment && (
            <Alert
              color="warning"
              description="Mohon hubungi bendahara untuk pembayaran."
              title="Anda Belum Membayar"
            />
          )}
          <div className="bg-foreground-100 p-3 rounded-lg">
            <p className="text-justify text-sm">
              {charge?.note || "Tidak ada catatan."}
            </p>
          </div>

          <Tabs fullWidth>
            <Tab title={charge?.users.paid.length + " Sudah Bayar"}>
              <div className="flex flex-col gap-2">
                {charge?.users.paid.map((item) => (
                  <Card
                    key={item.id}
                    className="p-2 flex-row justify-between items-center"
                  >
                    <User
                      avatarProps={{ src: item.user.avatar ?? undefined }}
                      description={item.user.role}
                      name={item.user.name}
                    />
                    <div className="text-end">
                      <p className="text-xs">Pembayaran</p>
                      <p className="text-xs">
                        {dayjs(item.paidAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Tab>
            <Tab
              className=""
              title={charge?.users.unpaid.length + " Belum Bayar"}
            >
              <div className="flex flex-col gap-2">
                {charge?.users.unpaid.map((item) => (
                  <Card
                    key={item.id}
                    className="p-2 flex-row justify-between items-center"
                  >
                    <User
                      avatarProps={{ src: item.user.avatar ?? undefined }}
                      description={item.user.role}
                      name={item.user.name}
                    />
                    {auth.hasRole(Role.Bendahara) && (
                      <Button
                        className=""
                        color="primary"
                        size="sm"
                        onPress={() => handlePaidButton(item)}
                      >
                        Lunas
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter className="p-4 items-center">
          <div className="me-auto">
            <p className="text-xs -mb-1 text-foreground-700">Nominal :</p>
            <p className="min-w-max font-bold text-primary text-lg">
              Rp {charge?.amount.toLocaleString()}
            </p>
          </div>
          <Button as={Link} color="primary" href="https://wa.me/6281234567890">
            Chat Bendahara
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChargeDetailModal;
