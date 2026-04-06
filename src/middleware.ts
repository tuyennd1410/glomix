import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Kiểm tra xem path có thuộc admin (trừ /admin/login) không.
 */
function isAdminProtectedPath(pathname: string): boolean {
  return pathname.startsWith("/admin") && pathname !== "/admin/login";
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass hoàn toàn intl cho /admin/* — không thêm locale prefix
  if (pathname.startsWith('/admin')) {
    // Bảo vệ route /admin/* (trừ /admin/login)
    if (isAdminProtectedPath(pathname)) {
      const token = request.cookies.get("admin_token")?.value;

      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url), 307);
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return NextResponse.redirect(new URL("/admin/login", request.url), 307);
      }

      try {
        const encodedSecret = new TextEncoder().encode(secret);
        await jwtVerify(token, encodedSecret);
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/admin/login", request.url), 307);
      }
    }

    // /admin/login → cho phép truy cập trực tiếp, không qua intl
    return NextResponse.next();
  }

  // Các route còn lại → giữ nguyên logic next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Bảo vệ toàn bộ /admin/*
    "/admin/:path*",

    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",

    // Enable redirects that add missing locales
    // Exclude: _next, _vercel, static files, và /api/* routes
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
