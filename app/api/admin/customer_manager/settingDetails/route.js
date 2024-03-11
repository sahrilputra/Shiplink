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
            name,
            email,
            password,
            phone_number,
            user_plan,
            profile_picture,
        } = await request.json();

        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/Customers/Setting_Account`,
            {
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                user_plan: user_plan,
                profile_picture: profile_picture,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                },
            }
        );
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

