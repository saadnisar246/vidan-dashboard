// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If user opens the root path, redirect to /login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  return response;
}

// Apply middleware to all routes except _next and favicon
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
