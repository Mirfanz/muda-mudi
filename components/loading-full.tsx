import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import React from "react";

type Props = {};

const LoadingFull = ({}: Props) => {
  return (
    <main className="w-full h-full p-4">
      <Image
        alt="loading image"
        height={500}
        src={"/src/svg/loading.svg"}
        width={500}
      />
      <div className="mt-6 flex justify-center items-center gap-3">
        <Spinner size="md" />
        <p className="text-foreground-500 text-lg">Tunggu Kiris...</p>
      </div>
    </main>
  );
};

export default LoadingFull;
