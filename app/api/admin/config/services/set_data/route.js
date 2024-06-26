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
            id,
            idconf,
            price,
            service_id,
            status,
            action,

        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Config/ServiceSetting_setdata`,
            {
                id: id,
                idconf: idconf,
                service_id: service_id,
                price: price,
                status: status,
                action: action
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${tokenAccess}`,
                },
            }
        );

        console.log("response from api : ", response); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: true,
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
