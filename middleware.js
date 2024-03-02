import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
// import withAuth from './helpers/withAuth';
export async function middleware(request) {
    // const res = NextResponse.next();
    // // console.log("From middleware", res)

    // const token = await getToken({
    //     req: request,
    //     secret: process.env.JWT_SECRET
    // });

    // if (!token) {
    //     return NextResponse.redirect('/auth/login');
    // }
    // return res;
}


// export default withAuth(middleware, ["/dashboard"])
// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }


