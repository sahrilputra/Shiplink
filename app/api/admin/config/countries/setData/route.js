import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const { country_id = "", country_code, country_name, country_numeric, status = "Active", action } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Config/Country_setdata`,
            {
                country_id: country_id,
                country_code: country_code,
                country_name: country_name,
                country_numeric: country_numeric,
                status: status,
                action: action,
            },
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

