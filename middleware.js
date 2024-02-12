import { NextResponse } from 'next/server'
// This function can be marked `async` if using `await` inside

export function middleware(request) {
    const token = request.cookies.get('token')
    if (token) {
        return NextResponse.redirect(new URL('/admin/arrival-scan', request.url))
    } else {
        return NextResponse.next()
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}