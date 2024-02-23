import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
import { cookies } from 'next/headers'

const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            LotsId,
            LotsLabel,
            Origin,
            Destination,
            TripNumber,
            Status,
            documents,
            action,
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Lots/Lots_list`,
            {
                lots_id: LotsId,
                label: LotsLabel,
                country_origin: Origin,
                destination: Destination,
                trip_number: TripNumber,
                status_id: Status,
                documents: documents,
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

        // console.log("response from api : ", response.data); // Log the response data

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

