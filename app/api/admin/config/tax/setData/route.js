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
            tax_assignment_id = "",
            tax_assignment_name,
            abbreviation,
            tax_number,
            tax_rate,
            action,
        } = await request.json();

        const response = await axios.post(
            `${process.env.API_URL}/Config/TaxAssignment_setdata`,
            {
                tax_assignment_id: tax_assignment_id,
                tax_assignment_name: tax_assignment_name,
                abbreviation: abbreviation,
                tax_number: tax_number,
                tax_rate: tax_rate,
                action: action
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${tokenAccess}`,
                },
            }
        );

        console.log("response from api : ", response.message); // Log the response data

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
