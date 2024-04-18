import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

import { getAccessToken } from "@/helpers/getAccessToken";
const agent = new https.Agent({
    rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const {
            category_code,
            categories,
            category_type,
            action,
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Products/ProductCategories_setdata`,
            {
                "category_code": category_code,
                "categories": categories,
                "level": 0,
                "parent_categories": "",
                "category_type": category_type,
                "action": action
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${tokenAccess}`
                },
            }
        );

        console.log(response)
        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
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
