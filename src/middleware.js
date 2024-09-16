import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = request.nextUrl // Return the path name that user wants to access

    const isPublicPath = pathname === '/components/login' || pathname === '/components/register'
    // const publicPaths = [
    //     '/components/login',
    //     '/components/register',
    //     '/components/verifyOtp'
    // ];

    // // Check if the current path is a public path or matches a pattern
    // const isPublicPath = publicPaths.some(path => pathname.startsWith(path)) ||
    //     pathname === '/' ||
    //     pathname.match(/^\/components\/verifyOtp\/[^\/]+$/);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/components/dashboard', request.url))
    } else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/components/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
    matcher : [
        '/',
        '/components/login',
        '/components/register',
        '/components/dashboard'
    ]
}