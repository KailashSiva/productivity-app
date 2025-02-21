import { verifyToken } from './lib/auth'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = req.cookies.get('session')?.value || ''
    const user = await verifyToken(token)
    console.log('running middleware')
    console.log('current user is', user)

    const protectedRoutes = ["/account", "/dashboard", "/profile", "/settings", '/tasks'];

    if (!user && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        console.log('not logged in, redirecting')
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/account/:path*"],
};