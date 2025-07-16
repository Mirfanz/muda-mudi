import { NextResponse } from "next/server";

export const responseError = (status: number, message: string) =>
  NextResponse.json(
    {
      status: "error",
      status_code: status,
      message,
    },
    { status },
  );
