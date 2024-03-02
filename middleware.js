import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
export { default } from "next-auth/middleware"
export async function middleware(request) {
    const session = await getSession({ req: request })
    console.log("My Session", session)
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }


