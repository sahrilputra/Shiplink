import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from 'next-auth/react';
// This function can be marked `async` if using `await` inside

export function middleware(request) {
    const token = cookies().get('token');
    // console.log("Halo Middleware")
    // console.log("Token From Middleware", token)

    const session = getSession()
    // console.log("My Session", session)


    // if (request.nextUrl.pathname === '/auth/admin') {
    //     if (token) {
    //         return NextResponse.redirect(new URL('/admin/arrival-scan', request.url))
    //     } else {
    //         return NextResponse.next()
    //     }
    // }
    // if (token) {
    //     const user = request.cookies.get('user');
    //     sessionStorage.setItem('token', token);
    //     sessionStorage.setItem('user', user);
    //     return NextResponse.redirect(new URL('/admin/arrival-scan', request.url))
    // } else {
    //     return NextResponse.next()
    // }
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }
