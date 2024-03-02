// import { NextRequest, NextResponse } from "next/server";
// export default function withAuth(middleware, requireAuth) {
//     return async (req, next) => {
//         const pathname = req.nextUrl.pathname;

//         if (requireAuth.incudles(pathname)) {

//             const token = await getToken({
//                 req,
//                 secret: process.env.JWT_SECRET
//             })
//             if (!token) {
//                 const url = new URL('/auth/login', req.url);
//                 url.searchParams.set('callbackUrl', encodeURI(req, url))
//                 return NextResponse.redirect(url);
//             }
//         }

//         return middleware(req, next);
//     };
// }