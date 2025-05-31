"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import React from "react";
import Swal from "sweetalert2";

import { UserType } from "@/types";
import { DeleteUser } from "@/lib/user.actions";

type Props = {
  user: UserType | null;
  onSuccess?: (user?: UserType) => void;
  onError?: (error: string) => void;
  onClose: () => void;
};

const DeleteUserModal = ({ user, onClose, onError, onSuccess }: Props) => {
  const [loading, setIsloading] = React.useState(false);
  const [confirm, setConfirm] = React.useState("");

  const handleDelete = () => {
    if (!user) return;
    setIsloading(true);
    DeleteUser({ userId: user.id })
      .then((resp) => {
        if (!resp.success) throw new Error(resp.message);
        onSuccess?.(user);
        addToast({
          title: "Successfully",
          description: `${user.name.split(" ")[0]} dihapus`,
          color: "success",
        });
        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          titleText: "Process Failed",
          text: error.message,
          draggable: true,
        });
        onError?.(error.message);
      })
      .finally(() => setIsloading(false));
  };

  React.useEffect(() => {
    if (!user) setConfirm("");
  }, [user]);

  return (
    <Modal isOpen={!!user} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Hapus {user?.name} ?</ModalHeader>
        <ModalBody>
          <div className="">
            Apakah anda yakin menghapus {user?.name} dari anggota karang taruna.
          </div>
          <Input
            description={`Ketik "${user?.name}" untuk konfirmasi.`}
            name="confirm"
            placeholder={user?.name}
            value={confirm}
            onValueChange={(val) => setConfirm(val)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            color="danger"
            isDisabled={confirm !== user?.name}
            isLoading={loading}
            onPress={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
