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

import { ChargeType } from "@/types";
import { useAuth } from "@/components/auth-provider";

type Props = {
  charge: ChargeType | null;
  onClose: () => void;
};

const ChargeDetailModal = ({ onClose, charge }: Props) => {
  const auth = useAuth();
  const [needPayment, setNeedPayment] = React.useState(false);

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
          <div className="bg-foreground-100 p-3 rounded-lg">
            <p className="text-justify text-sm">
              {charge?.note ?? "Tidak ada catatan."}
            </p>
          </div>
          <Tabs fullWidth>
            <Tab title={charge?.users.paid.length + " Sudah Bayar"}>
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
                      <Button className="" color="primary" size="sm">
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
          <Button color="primary" isDisabled={!needPayment}>
            Chat Bendahara
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChargeDetailModal;
