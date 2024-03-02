import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const { keyword, date_start, date_end, lots_id, destination, status, page, limit, index, token } = await request.json();

        const tokenAccess = await getAccessToken(request)
        const response = await axios.post(
            `${process.env.API_URL}/Lots/Destination_lots`,
            {
                keyword: keyword,
                date_start: date_start,
                date_end: date_end,
                lots_id: lots_id,
                status: status,
                destination: destination,
                page: page,
                limit: limit,
                index: index,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                }
            }
        );

        console.log("response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                total: response.data.total,
                page_total: response.data.page_total,
                page_limit: response.data.page_limit,
                lots: response.data.lots
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

