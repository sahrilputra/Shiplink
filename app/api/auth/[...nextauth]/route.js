import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export const authOption = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id: { label: "id", type: "text" },
                token: { label: "token", type: "text" },
                code: { label: "code", type: "text" },
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "text" },
                type: { label: "type", type: "text" },
                role: { label: "role", type: "text" },
                role_id: { label: "role_id", type: "text" },
                warehouse_id: { label: "warehouse_id", type: "text" },
                warehouse_name: { label: "warehouse_name", type: "text" },
                img: { label: "img", type: "text" },
                name: { label: "name", type: "text" },
            },

            authorize: async (credentials) => {
                const user = {
                    id: credentials.id,
                    code: credentials.code,
                    email: credentials.email,
                    password: credentials.password,
                    type: credentials.type,
                    role: credentials.role,
                    role_id: credentials.role_id,
                    warehouse_id: credentials.warehouse_id,
                    warehouse_name: credentials.warehouse_name,
                    img: credentials.img,
                    name: credentials.name,
                    accessToken: credentials.token,
                };
                if (user) {
                    return Promise.resolve(user);
                }
                return Promise.resolve(null);
            },
            redirect: '/auth/login',
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            
            console.log("🚀 ~ jwt ~ token:", token)


            if (user) {
                token.id = user.id;
                token.code = user.code;
                token.email = user.email;
                token.password = user.password;
                token.type = user.type;
                token.role = user.role;
                token.role_id = user.role_id;
                token.warehouse_id = user.warehouse_id;
                token.warehouse_name = user.warehouse_name;
                token.img = user.img;
                token.name = user.name;
                token.accessToken = user.accessToken;
                // console.log('JWT callback:', token);
                // Delete the token property to avoid overwriting the JWT token
                delete token.token;
            }


            return token;
        },

        async session({ session, token, user }) {
            // console.log("🚀 ~ session ~ token:", token)
            if (token) {
                session.user = {
                    id: token.id,
                    code: token.code,
                    email: token.email,
                    password: token.password,
                    type: token.type,
                    role: token.role,
                    role_id: token.role_id,
                    warehouse_id: token.warehouse_id,
                    warehouse_name: token.warehouse_name,
                    img: token.img,
                    name: token.name,
                    accessToken: token.accessToken,
                    // You can add other user properties here if needed
                };
                // console.log('Session callback:', session);
            }
            // console.log('Session callback:', session);
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
        error: '/auth/login',
        verifyRequest: '/auth/verification/1',
        newUser: '/auth/verification/1'
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST }

