import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        // const tokenAccess = await getAccessToken(request)
        const {
            tracking_id,
            broker,
            file_invoices,
            warehouse_destination,
            entry_number,
            parspaps_number,
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Package/SetCrossBorderPickup`,
            {
                "tracking_id": tracking_id,
                "broker": broker,
                "file_invoices": file_invoices,
                "warehouse_destination": warehouse_destination,
                "entry_number": entry_number,
                "parspaps_number": parspaps_number

            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer ${process.env.BEARER_TOKEN}`
                }
            }
        );
        console.log("🚀 ~ POST ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                status: response.data.status,
                message: response.data.message,
                total: response.data.total,
                services: response.data.services,
                clientSecret: response.data.clientSecret
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

