import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    const tokenAccess = await getAccessToken(request)
    try {
        const {
            tracking_id,
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Package/SetHoldPickup_package`,
            {
                tracking_id: tracking_id,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );
        
        console.log("🚀 ~ POST ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
                message: response.data.message,
                total: response.data.total,
                services: response.data.services,
                clientSecret: response.data.clientSecret
            };
            return NextResponse.json(responseData, { status: 200 });
        } else {
            return NextResponse.error({ message: response.data.message }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

