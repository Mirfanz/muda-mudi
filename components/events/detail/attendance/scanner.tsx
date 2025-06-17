"use client";

import React from "react";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Spinner } from "@heroui/spinner";

import { SubmitAttendance } from "@/lib/event.actions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onScan?: (decodedText: string) => void;
  onSuccess?: () => void;
};

const AttendanceScanner = ({ onScan, onSuccess, isOpen, onClose }: Props) => {
  const [isScanning, setIsScanning] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const qrRef = React.useRef<HTMLDivElement>(null);
  const [html5Qr, setHtml5Qr] = React.useState<Html5Qrcode | null>(null);

  const startScanning = () => {
    if (!html5Qr) return;
    html5Qr
      .start(
        { facingMode: "environment" },
        {
          fps: 2,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);

            return { width: minEdge - 50, height: minEdge - 50 };
          },
          aspectRatio: 1, // Force camera preview to be square
        },
        (decodedText, result) => {
          stopScanning();
          setIsLoading(true);
          SubmitAttendance({ code: decodedText })
            .then((resp) => {
              if (!resp.success)
                return Swal.fire({
                  icon: "warning",
                  title: "Gagal Absen",
                  text: "Kode QR tidak valid atau sudah digunakan. Silakan coba lagi.",
                });

              Swal.fire({
                icon: "success",
                title: "Absen Berhasil",
              });
              onSuccess?.();
              onClose();
              stopScanning();
            })
            .finally(() => setIsLoading(false));
        },
        (error) => {},
      )
      .then(() => setIsScanning(true));
  };
  const stopScanning = () => {
    if (!html5Qr) return;
    html5Qr.stop().then(() => setIsScanning(false));
  };

  React.useEffect(() => {
    if (!qrRef.current) return;
    if (!html5Qr) setHtml5Qr(new Html5Qrcode(qrRef.current.id));
  }, [isOpen]);

  return (
    <Modal hideCloseButton isOpen={isOpen}>
      <ModalContent>
        <ModalBody className="p-4">
          <div className="">
            <div
              className={clsx(
                "rounded-lg bg-foreground-100 flex justify-center items-center flex-col aspect-square gap-3",
                isScanning && "hidden",
              )}
            >
              {isLoading ? (
                <>
                  <Spinner className="w-24 h-24" size="lg" />
                  <p>Mencocokan Kode</p>
                </>
              ) : (
                <>
                  <QrCodeIcon className="w-24 h-24" />
                  <Button onPress={startScanning}>Scan Kode QR</Button>
                </>
              )}
            </div>
            <div
              ref={qrRef}
              className="w-full rounded-lg overflow-hidden"
              id="qr-reader"
            />
          </div>
          <Button
            onPress={() => {
              onClose();
              stopScanning();
            }}
          >
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceScanner;
