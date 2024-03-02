import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign-in form (e.g. 'Sign in with...')
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    // your backend authentication logic here
                    console.log("Credentials", credentials)
                    const response = await axios.post('https://sla.webelectron.com/api/Auth/GetToken', {
                        username: credentials.username,
                        password: credentials.password
                    }, {
                        httpsAgent: agent
                    });
                    console.log("Response", response.data.users)
                    const user = response.data.users; // adjust this based on your backend response
                    const token = response.data.token;
                    if (user) {
                        // Any object returned will be saved in the JSON Web Token
                        return Promise.resolve({ user, token });
                    } else {
                        // If you return null or false then the credentials will be rejected
                        return Promise.resolve(null);
                    }
                } catch (error) {
                    // Return null or throw an error to reject the login
                    console.log("Error", error)
                    return Promise.resolve(null);
                }
            }
        })
    ],
    callbacks: {
        async jwt(token, user) {
            // Menyesuaikan token JWT
            if (user) {
                console.log("User", user)
                token.id = user.user_id;
                console.log("token", token)
                token.bearer = user.bearer;
                console.log("Bearer", token.bearer)
                token.token = user.token; // Menambahkan token ke token JWT
            }
            return token;
        },
        async session(session, token) {
            // Memastikan token tidak undefined sebelum mengakses properti id
            if (token && token.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async signIn(user, account, profile) {
            // Eksekusi setelah pengguna berhasil login
            console.log("Login successful", user);
            // Tambahkan tindakan lanjutan di sini jika diperlukan
        },
    },

    pages: {
        signIn: ['/auth/signin', '/auth/login', '/auth/admin'],
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query parameter as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    }
});

export { handler as GET, handler as POST }