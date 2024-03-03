import { NextRequest, NextResponse } from "next/server";
export default function withAuth(middleware, requireAuth) {
    console.log("🚀 ~ withAuth ~ middleware:", middleware)
    console.log("🚀 ~ withAuth ~ requireAuth:", requireAuth)

    
    return async (req, next) => {
        const pathname = req.nextUrl.pathname;
        console.log("🚀 ~ return ~ pathname:", pathname)
        
        return middleware(req, next);
    };
}

    // if (requireAuth.incudles(pathname)) {
        //     const token = await getToken({
        //         req : req,
        //         secret: process.env.JWT_SECRET
        //     })
        //     if (!token) {
        //         const url = new URL('/auth/login', req.url);
        //         return NextResponse.redirect(url);
        //     }
        // }