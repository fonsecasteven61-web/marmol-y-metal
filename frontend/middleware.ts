import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir el acceso libre a la ruta de login de admin
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Si intenta entrar a cualquier otra ruta de admin, validamos la cookie de sesión
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};