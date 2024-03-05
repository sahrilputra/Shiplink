import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            username,
            password,
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Auth/GetToken`,
            {
                username: username,
                password: password,
            },
            {
                httpsAgent: agent,
            }
        );

        console.log("🚀 ~ POST ~ response:", response.data)

        if (response.status === 200) {
            if (response.data.message === "Unverified") {
                return NextResponse.json({ message: "Unverified" });
            } else if (response.data.message === "Incorrect username and password") {
                return NextResponse.json({ message: "Incorrect" });
            }
            const responseData = {
                status: true,
                message: response.data.message,
                token: response.data.token,
                users: response.data.users,
                permission: response.data.permission
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error({ message: "Internal Server Error" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

