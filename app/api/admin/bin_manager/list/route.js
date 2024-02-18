import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const { keyword, page, limit, index } = await request.json();

        // console.log("token from country", token);

        const response = await axios.post(
            `${process.env.API_URL}/Bins/Bins_list`,
            {
                keyword: keyword,
                page: page,
                limit: limit,
                index: index,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmN2U5NzcyYy03NmUxLTRiNDItODg3Mi01NWVkYTMzZjEyZTUiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVuaXF1ZV9uYW1lIjoic3VwZXJhZG1pbiIsIm5iZiI6MTcwNzY0MDM1NSwiZXhwIjoxNzA3NjgzNTU1LCJpYXQiOjE3MDc2NDAzNTV9.6KOCvrtE2m_Tm3JDX2-WAYNCa4Gv8D3CghuUhXG6DFo`
                }
            }
        );

        // console.log("response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                total: response.data.total,
                page_total: response.data.page_total,
                page_limit: response.data.page_limit,
                bins: response.data.bins
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
