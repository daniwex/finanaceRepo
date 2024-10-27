import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
  const user = cookies().get("currentUser");
  const { pathname } = request.nextUrl;

  if (user && (pathname === "/" || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
