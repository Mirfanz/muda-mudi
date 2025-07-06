import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { isAuthorized, verifyToken } from "./lib/utils/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const authToken = req.cookies.get("_session")?.value;
  const isAuthenticated = await verifyToken(authToken || "");

  // Jika user belum login dan akses halaman selain auth/login
  if (!isAuthenticated && !pathname.startsWith("/auth/login")) {
    const redirectUrl = new URL("/auth/login", req.url);

    redirectUrl.searchParams.set(
      "redirect_url",
      req.nextUrl.pathname + req.nextUrl.search,
    );

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && pathname.startsWith("/auth/login"))
    return NextResponse.redirect(new URL("/account", req.url));

  if (
    isAuthenticated &&
    pathname.startsWith("/admin") &&
    !isAuthorized(isAuthenticated.user.role, [
      Role.Admin,
      Role.Ketua,
      Role.Bendahara,
      Role.Sekretaris,
    ])
  )
    return NextResponse.error();

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|src/).*)"],
};
