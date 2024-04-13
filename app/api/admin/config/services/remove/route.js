import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false
});
export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const { id } = await request.json();
        const response = await axios.get(
            `${process.env.API_URL}/Config/ServiceSetting_delete?id=${id}`,
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );
        console.log("🚀 ~ GET ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                data: response.data,
                status: response.status,
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

