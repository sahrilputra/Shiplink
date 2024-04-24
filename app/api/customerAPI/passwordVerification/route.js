import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    console.log("You are in the passwordVerification route")
    try {
        const {
            reset_token,
            password
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Auth/SetResetPassword`,
            {
                reset_token: reset_token,
                password: password
            },
            {
                httpsAgent: agent,
            }
        );

        console.log("Response from API", response)

        
        if (response.status === 200) {
            const responseData = {
                status: response.data.staus,
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

