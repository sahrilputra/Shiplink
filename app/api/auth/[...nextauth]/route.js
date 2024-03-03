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
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    console.log("Credentials", credentials)
                    const response = await axios.post('https://sla.webelectron.com/api/Auth/GetToken', {
                        username: credentials.username,
                        password: credentials.password
                    }, {
                        httpsAgent: agent
                    });
                    console.log("Response Token ", response.data.token)
                    const token = response.data.token
                    // Extract token and user objects from response data
                    const { users } = response.data;

                    // Check if token and user objects are valid
                    if (!token || !users) {
                        throw new Error('Invalid response data');
                    }

                    if (users) {
                        users.accessToken = token;
                        console.log("Users", users.accessToken)
                        return Promise.resolve(users);
                    } else {
                        return null
                    }
                } catch (error) {
                    console.log("Error", error)
                    return Promise.resolve(null);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (user) {
                token.id = user.user_id;
                token.name = user.username;
                token.type = user.type;
                token.role = user.role;
                token.accessToken = user.accessToken;
                // console.log('JWT callback:', token);
                // Delete the token property to avoid overwriting the JWT token
                delete token.token;
            }
            return token;
        },

        async session({ session, token, user }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    type: token.type,
                    role: token.role,
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
        signIn: ['/auth/login', '/auth/admin'],
        signOut: '/auth/login',
        error: '/auth/login',
        // verifyRequest: '/auth/',
        newUser: null
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST }