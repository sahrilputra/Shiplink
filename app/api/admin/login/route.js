import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});

export async function POST(request) {

    try {
        const { username, password, remember } = await request.json();

        console.log("username", username);
        console.log("password", password);
        console.log("remember", remember);

        const response = await axios.post('https://sla.webelectron.com/api/Auth/GetToken', {
            username: username,
            password: password
        }, {
            httpsAgent: agent
        });

        // console.log("response", response.data); // Log the response data

        const token = response.data.token;
        const user = response.data.users;

        const isLogin = true;
        const type = user.type;
        const role = user.role
        console.log("Users", user);
        cookies().set('token', token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            secure: true,
            sameSite: 'strict'
        });
        cookies().set('type', type, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            secure: true,
            sameSite: 'strict'
        })
        cookies().set('role', role, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            secure: true,
            sameSite: 'strict'
        })

        if (remember === true) {
            const username = user.username;
            const email = user.email;
            // const password = password
            cookies().set('username', username, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
                secure: true,
                sameSite: 'strict'
            })
            cookies().set('email', email, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
                secure: true,
                sameSite: 'strict'
            })
        
        }

        // Menyimpan objek user ke dalam cookie satu persatu

        if (response.status === 200) {
            return NextResponse.json({ message: response.data.message }, { status: 200 });
        } else {
            return NextResponse.error({ message: response.data.message }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

