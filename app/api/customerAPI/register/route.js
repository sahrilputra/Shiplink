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
            name,
            email,
            country_code,
            password,
            user_plan,
        } = await request.json();


        const response = await axios.post(
            `${process.env.API_URL}/Auth/Register`,
            {
                name: name,
                email: email,
                country_code: country_code,
                password: password,
                user_plan: user_plan,
            },
            {
                httpsAgent: agent
            }
        );
        console.log("Response from API", response.data.message)
        if (response.status === 200) {
            const responseData = {
                status: true,
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

