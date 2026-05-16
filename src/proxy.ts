import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /*
  |--------------------------------------------------------------------------
   | Public Routes
   |--------------------------------------------------------------------------
   */

  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/api/auth");

  if (isPublicRoute) {
    const token = req.cookies.get("token")?.value;

    // Prevent logged-in users from seeing login page
    if (pathname.startsWith("/login") && token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);

        return NextResponse.redirect(new URL("/", req.url));
      } catch {
        // Invalid token → allow access to login
      }
    }

    return NextResponse.next();
  }

  /*
  |--------------------------------------------------------------------------
   | Protected Routes
   |--------------------------------------------------------------------------
   */

  const token = req.cookies.get("token")?.value;

  // No token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
  } catch {
    // Invalid token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

/*
|--------------------------------------------------------------------------
| Middleware Matcher
|--------------------------------------------------------------------------
*/

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
