

import { matchesRoute } from "@/lib/utils";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { adminRoutes, protectedRoutes } from "./lib/constants/permissions";


export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;


  if (
    isLoggedIn &&
    pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }


  if (
    !isLoggedIn &&
    matchesRoute(pathname, protectedRoutes)
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }


  if (
    matchesRoute(pathname, adminRoutes) &&
    req.auth?.user.role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
});