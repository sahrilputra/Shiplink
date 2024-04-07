import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import withAuth from './helpers/withAuth';
export async function middleware(request) {

    const res = NextResponse.next();
    const session = await getToken({
        req: request,
        secret: process.env.JWT_SECRET
    });
    const url = request.nextUrl.clone()
    console.log('role', session)
    if (!session) {
        return NextResponse.redirect(`${url.origin}/auth/login`)
    }
    if (session?.type === 'admin') {
        return NextResponse.redirect(`${url.origin}/admin/configuration`)
    }

    return res;
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/account/:path*'],
}

