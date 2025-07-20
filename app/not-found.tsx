"use client";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full p-2 h-dvh flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl text-primary mb-4 font-semibold">404</h1>
      <h2 className="text-xl lg:text-3xl mb-2 text-foreground-700 font-bold">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mb-6 max-w-96 text-foreground-500 text-sm lg:text-medium">
        Mohon Maaf, kami tidak dapat menemukan halaman yang anda cari.
      </p>
      <Button as={Link} color="default" href="/">
        Halaman Utama
      </Button>
    </main>
  );
}
