// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // console.log("Middleware: ", request.nextUrl.pathname)

  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

// Apply middleware to all routes or specific paths
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
