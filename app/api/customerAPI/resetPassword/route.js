import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            email,
            redirect
        } = await request.json();

        console.log("🚀 ~ GET ~email:", email)

        const response = await axios.get(
            `${process.env.API_URL}/Auth/ForgetPassword?email=${email}&redirect_url=${redirect}`,
            {
                httpsAgent: agent
            }
        );
        console.log("Response from API", response)
        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
                message: response.data.message,
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error(
                { message: response.data.message },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

