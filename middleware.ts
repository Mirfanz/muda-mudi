import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "./lib/utils";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const authToken = req.cookies.get("_session")?.value;
  const isAuthenticated = await verifyToken(authToken || "");

  // Jika user belum login dan akses halaman selain auth/login
  if (!isAuthenticated && !pathname.startsWith("/auth/login"))
    return NextResponse.redirect(new URL("/auth/login", req.url));

  if (isAuthenticated && pathname.startsWith("/auth/login"))
    return NextResponse.redirect(new URL("/account", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
