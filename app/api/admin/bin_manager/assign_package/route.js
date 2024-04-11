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
            bins_id,
            tracking_id,
            confirm_overide = true,
        } = await request.json();

        // console.log("token from country", token);
        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/Bins/AsignPackage_bins`,
            {
                bins_id: bins_id,
                tracking_id: tracking_id,
                confirm_overide: confirm_overide,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );

        console.log("response from api : ", response); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
                message: response.data.message,
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

