"use client";

import { Alert } from "@heroui/alert";
import React from "react";

type Props = {};

const Feedback = (props: Props) => {
  return (
    <section className="p-3">
      <Alert
        color="warning"
        description="Mohon maaf, fitur feedback masih dalam pengembangan."
        title="Fitur Belum Tersedia"
      />
    </section>
  );
};

export default Feedback;
