import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
   "/dashboard/:path*",
    "/ncmrs/:path*",
    "/capas/:path*",
     "/audit/:path*",
     "/reports/:path*",
    "/suppliers/:path*",
    "/validation/:path*",
    "/settings/:path*",
  ],
};
