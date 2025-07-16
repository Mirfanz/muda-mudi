import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { responseError } from "@/lib/utils/api";
import { ResponseSuccess } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    const result = await axios.get(
      "https://api.trakteer.id/v1/public/current-balance",
      {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          key: process.env.TRAKTEER_KEY,
        },
      },
    );

    const resp: ResponseSuccess<{}> = {
      status_code: 200,
      status: "success",
      message: "OK",
      result: result.data.result as number,
    };

    return NextResponse.json(resp, { status: resp.status_code });
  } catch (error) {
    return responseError(500, "Terjadi kesalahan");
  }
}
