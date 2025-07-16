"use client";

import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/modal";
import { NumberInput } from "@heroui/number-input";
import React, { FormEvent } from "react";

import { createDonation } from "@/lib/donation.actions";
import { useAuth } from "@/components/auth-provider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const DonateModal = ({ isOpen, onClose, onError, onSuccess }: Props) => {
  const auth = useAuth();
  const [fields, setFields] = React.useState({
    name: "",
    hideName: false,
    amount: 0,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const close = () => {
    onClose();
  };
  const handlePay = async (snapToken: string) => {
    // @ts-ignore
    window.snap.pay(snapToken, {
      onSuccess: (result: any) => {
        alert("Pembayaran sukses!");
        // handle success
      },
      onPending: (result: any) => {
        alert("Pembayaran pending!");
        // handle pending
      },
      onError: (result: any) => {
        alert("Pembayaran gagal!");
        // handle error
      },
      onClose: () => {
        alert("Kamu menutup popup tanpa menyelesaikan pembayaran");
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    createDonation({
      name: fields.hideName ? "Hamba Allah" : fields.name,
      amount: fields.amount,
    })
      .then((resp) => {
        if (!resp.success) return alert("Buat Donasi Gagal");
        handlePay(resp.data.token);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    if (auth.user) setFields({ ...fields, name: auth.user.name });
  }, [auth.user]);

  return (
    <Modal hideCloseButton isOpen={isOpen}>
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalBody className="mt-4">
            <Input
              isReadOnly={fields.hideName}
              label="Nama Lengkap"
              name="name"
              placeholder="Ketik namamu sayang"
              value={fields.hideName ? "Hamba Allah" : fields.name}
              onValueChange={(val) => setFields({ ...fields, name: val })}
            />
            <Checkbox
              size="sm"
              onValueChange={(val) => setFields({ ...fields, hideName: val })}
            >
              Sembunyikan nama saya
            </Checkbox>
            <NumberInput
              classNames={{ label: "me-auto" }}
              label="Nominal"
              labelPlacement="outside-left"
              minValue={0}
              name="amount"
              placeholder="5,000"
              startContent={"Rp"}
              step={500}
              validate={(val) => {
                if (val < 10000) return "Maaf Belum";

                return true;
              }}
              value={fields.amount}
              onValueChange={(val) => setFields({ ...fields, amount: val })}
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={close}>Batal</Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              Pembayaran
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default DonateModal;
