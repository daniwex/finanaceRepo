import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export function middleware(request) {
    const user = cookies().get("currentUser")
    if(request.nextUrl.pathname.endsWith("/") && user){
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if(request.nextUrl.pathname.startsWith("register") && user){
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if(request.nextUrl.pathname.includes("dashboard") && !user){
        return NextResponse.redirect(new URL("/", request.url))
    } 
}
 