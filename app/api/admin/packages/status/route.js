import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function GET(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        console.log("code : ", tokenAccess)
        const response = await axios.post(
            `${process.env.API_URL}/Package/Packages_Status`,
            null, 
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                }
            }
        );

        console.log("🚀 ~ GET ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                data: response.data,
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

