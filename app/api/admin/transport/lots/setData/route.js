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
            LotsId,
            LotsLabel,
            Origin,
            Destination_country,
            TripNumber,
            Status,
            Documents,
            pickDate,
            action,
        } = await request.json();

        
        const response = await axios.post(
            `${process.env.API_URL}/Lots/Lots_setdata`,
            {
                lots_id: LotsId,
                label: LotsLabel,
                country_origin: Origin,
                destination: Destination_country,
                pickup_schedule: "",
                trip_number: TripNumber,
                status_id: Status,
                pickup_schedule:pickDate,
                documents: Documents,
                action: action,
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
                response: response.data
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

