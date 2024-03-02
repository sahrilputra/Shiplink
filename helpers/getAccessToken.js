import { getToken } from "next-auth/jwt";

export async function getAccessToken(request) {
    const session = await getToken({
        req: request,
        secret: process.env.JWT_SECRET
    });
    return session.accessToken;
}