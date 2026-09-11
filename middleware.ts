import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow access to admin login page and auth APIs
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout")
  ) {
    return NextResponse.next();
  }

  // 2. Protect Admin Frontend Pages (/admin, /admin/products, /admin/products/new, etc.)
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = adminToken ? await verifyAdminToken(adminToken) : null;

    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 3. Protect Admin Mutation APIs
  // POST/PUT/DELETE on /api/products and any /api/admin/*
  if (
    pathname.startsWith("/api/admin") ||
    (pathname === "/api/products" && request.method !== "GET")
  ) {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = adminToken ? await verifyAdminToken(adminToken) : null;

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Admin authentication required to perform this action.",
        },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/products",
  ],
};
