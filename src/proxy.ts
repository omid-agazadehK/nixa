import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isLoggedIn && req.nextUrl.pathname === "/cart"||!isLoggedIn && req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
});
export const config = {
  matcher:
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
