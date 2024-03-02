import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { cookies } from "next/headers";

const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            user_code,
            email,
            name,
            password,
            phone_number,
            role,
            role_id,
            warehouse_id,
            profile_picture,
            action,
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Users/Users_setdata`,
            {
                user_code: user_code,
                email: email,
                name: name,
                password: password,
                phone_number: phone_number,
                role: role,
                role_id: role_id,
                warehouse_id: warehouse_id,
                profile_picture: profile_picture,
                action: action,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${process.env.BEARER_TOKEN}`
                },
            }
        );

        console.log("Response From API :", response.data); 

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
