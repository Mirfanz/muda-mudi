import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { responseError } from "@/lib/utils/api";
import { ResponseSuccess } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    let page = req.nextUrl.searchParams.get("page");

    if (!page || !parseInt(page))
      return responseError(400, "Parameter page wajib");

    const result = await axios.get(
      "https://api.trakteer.id/v1/public/supports",
      {
        params: {
          limit: 25,
          page: 1,
        },
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          key: process.env.TRAKTEER_KEY,
        },
      },
    );

    const resp: ResponseSuccess = {
      message: "OK",
      result: result.data.result,
      status: "success",
      status_code: 200,
    };

    return NextResponse.json(resp, { status: resp.status_code });
  } catch (error: any) {
    console.error("Error:", error?.response?.data || error.message);

    return responseError(500, "Terjadi kesalahan");
  }
}
