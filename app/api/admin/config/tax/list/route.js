import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            keyword,
            country_code,
            page,
            limit,
            index,
            token
        } = await request.json();
        const tokenAccess = await getAccessToken(request)
        // console.log("token from country", token);

        const response = await axios.post(
            `${process.env.API_URL}/Config/Tax_list`,
            {
                keyword: keyword,
                country_code: country_code,
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

        console.log(" LIST response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
                message: response.data.message,
                total: response.data.total,
                page_total: response.data.page_total,
                page_limit: response.data.page_limit,
                tax: response.data.tax
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

