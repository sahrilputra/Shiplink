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
        const { data } = await request.json();
        
        const tokenAccess = await getAccessToken(request)
        
        console.log("code : ", data)
        const response = await axios.get(
            `${process.env.API_URL}/Config/Country_delete?country_code=${data}`,
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${process.env.BEARER_TOKEN}`
                }
            }
        );

        if (response.status === 200) {
            const responseData = {
                status: true,
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

