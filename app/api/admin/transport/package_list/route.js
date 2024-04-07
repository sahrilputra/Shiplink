import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { getAccessToken } from "@/helpers/getAccessToken";

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const tokenAccess = await getAccessToken(request)
        const {
            keyword,
            date_start,
            date_end,
            tracking_id,
            lots_id,
            bins_id,
            customer_id,
            country_origin,
            country_destination,
            warehouse_origin,
            warehouse_destination,
            warehouse_position,
            email,
            status,
            page,
            limit,
            index,
        } = await request.json();


        const response = await axios.post(
            `${process.env.API_URL}/Package/Package_list_transport`,
            {
                keyword: keyword,
                date_start: date_start,
                date_end: date_end,
                tracking_id: tracking_id,
                lots_id: lots_id,
                bins_id: bins_id,
                customer_id: customer_id,
                country_origin: country_origin,
                country_destination: country_destination,
                warehouse_origin: warehouse_origin,
                warehouse_destination: warehouse_destination,
                warehouse_position: warehouse_position,
                email: email,
                status: status,
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

        // console.log("response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                total: response.data.total,
                page_total: response.data.page_total,
                page_limit: response.data.page_limit,
                package_info: response.data.package_info
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

