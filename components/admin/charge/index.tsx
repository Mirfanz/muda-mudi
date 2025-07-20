"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Spinner } from "@heroui/spinner";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addToast } from "@heroui/toast";

import Header from "../header";

import AddChargeModal from "./add";

import ChargeDetailModal from "@/components/site/charge/detail";
import { ChargeType } from "@/types";
import { DeleteCharge, FindCharges } from "@/lib/charge.actions";

type Props = {};

const Charge = (props: Props) => {
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["find-charges"],
      queryFn: async ({ pageParam = 1 }) => {
        const resp = await FindCharges({ page: pageParam });

        if (!resp.success) throw new Error(resp.message);

        return resp;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.data?.length == lastPage.take) return lastPage.page + 1;

        return undefined;
      },
    });
  const [shownCharge, setShownCharge] = React.useState<ChargeType | null>(null);
  const [addChargeOpen, setAddChargeOpen] = React.useState(false);

  const deleteCHarge = (charge: ChargeType) => {
    if (charge.users.paid.length > 0)
      return Swal.fire({
        icon: "error",
        title: "Tidak Bisa Dihapus",
        text: "Tidak dapat menghapus data sudah ada pembayaran.",
        showConfirmButton: false,
      });
    Swal.fire({
      icon: "question",
      title: "Yakin Hapus?",
      text: "Data akan dihapus secara permanen.",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor:
        "hsl(var(--heroui-danger) / var(--heroui-danger-opacity, 1))",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      DeleteCharge({ chargeId: charge.id }).then((resp) => {
        if (!resp.success)
          return Swal.fire({
            icon: "error",
            title: "Gagal",
            text: resp.message,
          });
        refetch();
        addToast({
          description: "Berhasil menghapus penagihan",
          color: "success",
        });
      });
    });
  };

  return (
    <main className="px-8 py-4">
      <Header
        description="Manajemen data kas, iuran, dan denda di sini."
        endContent={
          <Button
            color="primary"
            startContent={<PlusIcon className="w-4 h-4" />}
            onPress={() => setAddChargeOpen(true)}
          >
            Tambah
          </Button>
        }
        title="Kas, Iuran & Denda"
      />
      <section>
        <Table
          bottomContent={
            hasNextPage && (
              <Button
                className="mx-auto"
                fullWidth={false}
                isLoading={isLoading}
                onPress={() => fetchNextPage()}
              >
                Show More
              </Button>
            )
          }
        >
          <TableHeader>
            <TableColumn>TANGGAL</TableColumn>
            <TableColumn className="w-full">TITLE</TableColumn>
            <TableColumn className="">PEMBUAT</TableColumn>
            <TableColumn align="center">DIBAYAR</TableColumn>
            <TableColumn>NOMINAL</TableColumn>
            <TableColumn align="center" className="">
              AKSI
            </TableColumn>
          </TableHeader>
          <TableBody
            items={data?.pages.flatMap((page) => page.data) || []}
            loadingContent={<Spinner />}
            loadingState={isLoading ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow>
                <TableCell className="">
                  <p className="min-w-max">
                    {dayjs(item.createdAt).format("DD MMM YYYY")}
                  </p>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <p className="!min-w-max">{item.author.name}</p>
                </TableCell>
                <TableCell>
                  {item.users.paid.length}/
                  {item.users.paid.length + item.users.unpaid.length}
                </TableCell>
                <TableCell>
                  <p className="!min-w-max">
                    Rp {item.amount.toLocaleString()}
                  </p>
                </TableCell>
                <TableCell align="center" className="">
                  <div className="flex !w-max">
                    <Button
                      isIconOnly
                      color="default"
                      size="sm"
                      variant="light"
                      onPress={() => setShownCharge(item)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      variant="light"
                      onPress={() => deleteCHarge(item)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      <ChargeDetailModal
        charge={shownCharge}
        refetch={refetch}
        onClose={() => setShownCharge(null)}
      />
      <AddChargeModal
        isOpen={addChargeOpen}
        onCLose={() => setAddChargeOpen(false)}
        onSuccess={refetch}
      />
    </main>
  );
};

export default Charge;
